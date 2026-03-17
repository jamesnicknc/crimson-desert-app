## Repository & Deployment

- **GitHub repo**: github.com/jamesnicknc/crimson-desert-app
- **SSH**: git@github.com:jamesnicknc/crimson-desert-app.git
- **Local workspace path**: /crimson-desert-app
- **Hosting**: Vercel (auto-deploys on push to main)
- **Domain**: crimsoncompanionapp.us
- **Backend**: Supabase (PostgreSQL + Auth)

---

## Git in Cowork Sessions -- Root Cause and Rules

### Why git breaks in this workspace

The workspace folder (`/sessions/.../mnt/crimson-desert-app`) is on a **Windows NTFS filesystem synced by OneDrive**. This causes two distinct classes of git failures:

**Class 1 -- Lock file conflicts (blocks all git writes)**
Git uses temporary lock files (`index.lock`, `HEAD.lock`, `packed-refs.lock`) as write semaphores. It creates them, does work, then deletes them. OneDrive sees these files appear and syncs them to the cloud. When the session ends or OneDrive does a resync, it writes them *back* to the filesystem. Git then sees an existing lock file and refuses to run, believing another git process is active. The files cannot be deleted from the Linux VM (`Operation not permitted`) because they are owned/locked by OneDrive's Windows process.

**Class 2 -- Stuck merge/rebase state**
If a `git pull` or `git merge` was run from the workspace (or a previous Cowork session attempted it), it may have left `MERGE_HEAD`, `rebase-merge/`, and related state files. OneDrive preserves these across sessions. The repo then appears to be mid-merge indefinitely, and `git status` says "All conflicts fixed but you are still merging" even though no actual conflict exists.

**Class 3 -- Session path changes**
Each Cowork session gets a new session ID (e.g., `/sessions/elegant-epic-planck/`). Any hardcoded paths in scripts or CLAUDE.md from a previous session (e.g., `/sessions/sharp-vigilant-keller/`) will break. Always use the current session path.

---

## The Push Procedure (use every single time)

Never run git commands directly in the workspace. Always use a fresh /tmp clone.

```bash
# Step 1 -- Set up deploy key (adjust session path to current session)
mkdir -p ~/.ssh && cp /sessions/elegant-epic-planck/mnt/crimson-desert-app/.cowork/deploy_key ~/.ssh/deploy_key && chmod 600 ~/.ssh/deploy_key

# Step 2 -- Clone fresh from GitHub into /tmp (no lock files here)
GIT_SSH_COMMAND="ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no" \
  git clone git@github.com:jamesnicknc/crimson-desert-app.git /tmp/crimson-push

# Step 3 -- Copy your changed files from the workspace into the clean clone
cp /sessions/elegant-epic-planck/mnt/crimson-desert-app/path/to/file.ts /tmp/crimson-push/path/to/file.ts
# (repeat for each changed file)

# Step 4 -- Commit and push from the clean clone
cd /tmp/crimson-push
git config user.email "james.nick.nc@gmail.com"
git config user.name "Nick James"
git add path/to/file.ts
git commit -m "your message"
GIT_SSH_COMMAND="ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no" git push origin main

# Step 5 -- Clean up
rm -rf /tmp/crimson-push
```

### How to identify which files actually changed

Before copying, always check what the workspace has vs what GitHub has:

```bash
# Clone a reference copy of GitHub's current state
GIT_SSH_COMMAND="ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no" \
  git clone git@github.com:jamesnicknc/crimson-desert-app.git /tmp/crimson-ref

# Then diff specific files you care about
diff /sessions/elegant-epic-planck/mnt/crimson-desert-app/src/lib/game-data.ts \
     /tmp/crimson-ref/src/lib/game-data.ts

# Or diff everything (summary)
diff -rq --exclude=".git" \
  /sessions/elegant-epic-planck/mnt/crimson-desert-app/ \
  /tmp/crimson-ref/ 2>/dev/null | grep -v ".cowork\|node_modules\|\.next\|.bak"
```

This is the only reliable way to know what's genuinely new vs what is merge noise from the stuck workspace state.

---

## What to Do If the Workspace Git State Is Broken

Symptoms: "All conflicts fixed but you are still merging", MERGE_HEAD exists, git status shows dozens of modified files but nothing was actually changed, lock file errors.

**Do not try to fix the workspace git state.** The lock files cannot be deleted from the Linux VM. Attempting `git merge --abort`, `git reset`, `git checkout` etc. in the workspace will fail or make things worse.

**The correct approach:**
1. Treat the workspace as a **read-only file source**. Read files from it, do not run git in it.
2. Always compare workspace files against a fresh `/tmp` clone of GitHub to identify what is genuinely new.
3. Copy only the genuinely new/changed files into the `/tmp` clone and commit from there.
4. The workspace git state will remain broken until the permanent fix below is applied on Windows.

---

## Permanent Fix (do once on Windows)

The permanent solution is to tell OneDrive to stop syncing the `.git` folder entirely. Run this in PowerShell from the repo root:

```powershell
# Mark the .git folder as system+hidden so OneDrive skips it
attrib +h +s .git /s /d
```

After running this, OneDrive will no longer sync `.git`, lock files will not be recreated, and git will work normally from the workspace in future sessions.

**Alternatively:** Move the repo out of the OneDrive-synced folder entirely (e.g., to `C:\Projects\crimson-desert-app` instead of a OneDrive path). Then the workspace sync would need to be reconfigured, but git would work without workarounds.

---

## Deploy Key Location

The deploy key is at: `/sessions/<current-session-id>/mnt/crimson-desert-app/.cowork/deploy_key`

The session ID changes each time. Always construct the path using the current session ID, not a hardcoded one from a previous session.
