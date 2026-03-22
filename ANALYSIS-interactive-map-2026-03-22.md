# System Analysis: Interactive Map System
_Date: 2026-03-22 | Type: Architecture Review + Recreation Plan_

## Executive Summary

The current interactive map is a read-only Leaflet overlay with 63 hardcoded markers in a static TypeScript array. It has no connection to Supabase, no user interaction beyond filtering, and no awareness of the group system. The database already has a `map_pins` table with RLS policies for group-shared pins, but zero frontend code consumes it. Recreating this as a full collaborative map requires replacing the data layer, adding a pin-creation UX, wiring up real-time Supabase subscriptions, and rethinking the component architecture from the ground up.

## Health Score

| Area | Score | Notes |
|------|-------|-------|
| Architecture | Red | Map is entirely client-side static data; DB schema exists but is unused |
| Data Integrity | Yellow | Hardcoded markers are well-structured but disconnected from the DB |
| User Features | Red | No pin creation, no group sharing, no real-time updates |
| Auth Integration | Red | Map component has zero auth awareness; doesn't know who the user is |
| Performance | Yellow | Leaflet setup is fine for current scale; will need optimization for many user pins |
| Map Accuracy | Yellow | Using CRS.Simple with arbitrary 0-1000 coords; no calibration to real game map |

---

## Critical Findings

### 1. Map Pins Table Exists But Is Completely Unused
**Severity**: Critical
**Impact**: The entire user-pin feature (the core of this request) is unbuilt. The `map_pins` table in Supabase has the right schema and RLS policies, but nothing in the frontend reads from it, writes to it, or subscribes to changes.
**Evidence**: `InteractiveMap.tsx` imports only from `@/lib/map-data` (static array). No Supabase client is imported. No `useEffect` fetches pins. No click handler exists for placing pins.
**Recommendation**: Build a `useMapPins` hook that CRUD-operates against Supabase and subscribes to real-time changes.

### 2. No Auth Context in the Map Component
**Severity**: Critical
**Impact**: Without knowing who the logged-in user is, the map cannot create pins, show "my pins vs group pins," or enforce any personalization.
**Evidence**: `InteractiveMap.tsx` does not import `useUser` or any Supabase client.
**Recommendation**: Pass user context into the map. Use it to determine: can this user add pins? Which group pins should load? What edit/delete permissions apply?

### 3. Static Markers Are Hardcoded in TypeScript, Not in the Database
**Severity**: High
**Impact**: The 63 "official" map markers (towns, dungeons, bosses, POIs, fast-travel points) live in `map-data.ts` as a static array. This means: no one can add or correct markers without a code deploy, and they exist in a completely different data model than user-created pins.
**Evidence**: `src/lib/map-data.ts` contains `MAP_MARKERS: MapMarker[]` with 63 entries and `REGION_LABELS: MapRegionLabel[]` with 5 entries.
**Recommendation**: Keep static markers as the "base layer" (they're fast, zero-latency, and don't require auth). Layer user/group pins on top as a separate data source from Supabase.

### 4. Group-Pin RLS Policy Has a Performance Concern
**Severity**: Medium
**Impact**: The "Group members can view shared pins" policy uses a correlated subquery joining `group_members` to itself. For users in multiple groups with many shared pins, this could become slow.
**Evidence**: Migration line 174-180:
```sql
is_shared = true and user_id in (
  select gm2.user_id from public.group_members gm1
  join public.group_members gm2 on gm1.group_id = gm2.group_id
  where gm1.user_id = auth.uid()
)
```
**Recommendation**: This is acceptable for now (groups are small). Add an index on `map_pins(is_shared, user_id)` if it becomes slow. Consider denormalizing with a `group_id` column on pins if groups get large.

### 5. No Real-Time Subscription Architecture
**Severity**: High
**Impact**: When a group member adds a pin, other members won't see it until they refresh the page.
**Evidence**: No Supabase `.subscribe()` or `channel()` calls anywhere in the codebase.
**Recommendation**: Use Supabase Realtime to subscribe to `map_pins` inserts/updates/deletes for the current user's group members. Leaflet can efficiently add/remove markers without re-rendering the whole map.

### 6. Map Image and Coordinate System
**Severity**: Medium
**Impact**: The map uses `CRS.Simple` with bounds `[0,0]` to `[1000,1000]` over a single JPEG (`pywel-map-real.jpg`, 2.1 MB). The coordinate placement of markers appears to be manual best-guesses. If the map image changes or a higher-resolution version is added, all coordinates would need recalibration.
**Evidence**: `MAP_BOUNDS: [[0, 0], [1000, 1000]]` and all marker coords are in this range.
**Recommendation**: This system is fine for the current map. Document the coordinate system clearly and consider adding a "coordinate picker" dev tool for placing new static markers accurately.

---

## High Priority Items

### 7. PinCategory Type Mismatch Between Map and DB
The static `MarkerCategory` type is `'town' | 'dungeon' | 'boss' | 'poi' | 'fast-travel'`, while the DB/types `PinCategory` is `'collectible' | 'boss' | 'npc' | 'poi' | 'custom'`. These need to coexist cleanly in the UI without confusion. The filter bar should handle both sets.

### 8. No Pin Edit/Delete Capability in Schema UX
The `map_pins` table supports full CRUD via the "Users can manage own pins" RLS policy, but there's no UI for editing a pin's label, notes, category, or deleting it. This is essential for the feature to be useful.

### 9. Missing `group_id` on Map Pins
Currently `map_pins` uses `is_shared` boolean + RLS to determine visibility. This means a pin is shared with ALL of a user's groups or none. If a user is in multiple groups, they can't share a pin with just one group. Consider adding an optional `group_id` foreign key for targeted sharing.

---

## Medium / Low Priority

- **Map image resolution**: The current 2.1MB JPEG works but gets blurry at high zoom. Consider adding tile-based zoom levels or a higher-res source.
- **Mobile touch UX**: Pin placement via long-press needs careful handling on mobile to not conflict with map panning.
- **Pin clustering**: If many users add many pins, the map will get cluttered. Leaflet.markercluster would help.
- **Search/filter for user pins**: Users should be able to filter their own pins by category and search by label.
- **Pin color differentiation**: Group members' pins should have distinct colors or avatar indicators so you can tell who placed what.

---

## Recreation Plan: From Static Map to Collaborative Map

### Phase 1: Core Infrastructure (Foundation)

**New/Modified Files:**

| File | Action | Purpose |
|------|--------|---------|
| `src/hooks/use-map-pins.ts` | CREATE | Hook: fetch, create, update, delete pins from Supabase; real-time subscription |
| `src/hooks/use-group-members.ts` | CREATE | Hook: fetch current user's group members (for pin ownership display) |
| `src/components/map/InteractiveMap.tsx` | REWRITE | Full rebuild with pin layers, click-to-place, popups with edit/delete |
| `src/components/map/PinCreationModal.tsx` | CREATE | Modal/drawer for entering pin details (label, category, notes, shared toggle) |
| `src/components/map/PinPopup.tsx` | CREATE | Rich popup for viewing pin details with edit/delete for own pins |
| `src/components/map/MapFilterBar.tsx` | CREATE | Extracted filter bar supporting both static categories and user pin categories |
| `src/components/map/MapLegend.tsx` | CREATE | Extracted legend component |
| `src/app/(app)/map/page.tsx` | MODIFY | Pass user context, add pin management UI chrome |

**Database Changes:**
- Add migration `002_map_pins_group_id.sql`: add optional `group_id` column to `map_pins` for targeted group sharing
- Add index on `map_pins(is_shared, user_id)`
- Add a `get_group_pins` function for efficient fetching

### Phase 2: Pin Creation and Management

**User Flow:**
1. User clicks/taps a location on the map
2. A marker appears at that location with a creation form (modal or inline panel)
3. User enters: label (required), category (dropdown), notes (optional), share toggle
4. On save, pin is inserted into Supabase via `use-map-pins` hook
5. Pin appears immediately (optimistic update) and syncs to DB
6. Other group members see the pin appear in real-time via Supabase Realtime

**Pin Popup (viewing):**
- Shows: label, category badge, notes, who placed it (display name + avatar), when
- If it's your pin: edit and delete buttons
- If it's a group member's pin: read-only with the member's name/avatar

### Phase 3: Real-Time Group Sync

**Architecture:**
```
Browser A (User adds pin)
    |
    v
Supabase INSERT into map_pins
    |
    v
Supabase Realtime broadcasts to channel
    |
    v
Browser B, C, D (Group members) receive event
    |
    v
useMapPins hook updates local state
    |
    v
Leaflet re-renders just the new marker (no full re-render)
```

**Implementation:**
- Subscribe to `postgres_changes` on `map_pins` table
- Filter events to only pins from group members (client-side filter on the subscription, or use Supabase's filter parameter)
- Handle INSERT (add marker), UPDATE (update popup content), DELETE (remove marker)

### Phase 4: Polish and UX

- **Pin clustering** with `leaflet.markercluster` for dense areas
- **Color coding**: each group member gets a unique color for their pins
- **Search bar**: filter/search user pins by label text
- **"My Pins" panel**: sidebar or drawer listing all your pins with jump-to-location
- **Coordinate picker mode**: hold Shift + click to copy coordinates (dev tool for adding static markers)
- **Undo**: briefly show an "Undo" toast after placing a pin, in case of misclick
- **Mobile long-press**: differentiate between pan and pin placement on touch devices

---

## Component Architecture (Proposed)

```
MapPage (page.tsx)
  |-- useUser()           -> auth context
  |-- useMapPins(userId)  -> pin CRUD + real-time
  |-- useGroupMembers()   -> group context for pin colors/names
  |
  +-- MapFilterBar        -> toggle static categories + user pin categories
  +-- InteractiveMap
  |     |-- Static Layer  -> MAP_MARKERS from map-data.ts (read-only)
  |     |-- Region Labels -> REGION_LABELS from map-data.ts
  |     |-- User Pin Layer -> pins from useMapPins (interactive)
  |     |-- Click Handler -> opens PinCreationModal at click coords
  |     +-- PinPopup      -> shown on marker click (view/edit/delete)
  +-- PinCreationModal    -> form for new pin details
  +-- MapLegend           -> color/icon reference
  +-- MyPinsDrawer        -> (optional) list of user's pins with jump-to
```

---

## Recommendations Summary

| # | Action | Severity | Effort | Phase |
|---|--------|----------|--------|-------|
| 1 | Build `useMapPins` hook with Supabase CRUD | Critical | M | 1 |
| 2 | Wire auth context into map page | Critical | S | 1 |
| 3 | Rewrite InteractiveMap with dual-layer architecture | Critical | L | 1 |
| 4 | Build PinCreationModal component | Critical | M | 2 |
| 5 | Build PinPopup with view/edit/delete | High | M | 2 |
| 6 | Add Supabase Realtime subscription for group pins | High | M | 3 |
| 7 | Extract MapFilterBar to handle both marker types | High | S | 1 |
| 8 | Add `group_id` to map_pins + migration | Medium | S | 1 |
| 9 | Add pin clustering for dense areas | Medium | S | 4 |
| 10 | Mobile long-press pin placement | Medium | M | 4 |
| 11 | "My Pins" drawer with jump-to-location | Low | M | 4 |
| 12 | Higher-res map tiles for deep zoom | Low | L | Future |

---

## Next Review

Re-evaluate after Phase 2 is complete to assess real-time performance, pin volume patterns, and whether the `group_id` scoping is needed based on actual user behavior.
