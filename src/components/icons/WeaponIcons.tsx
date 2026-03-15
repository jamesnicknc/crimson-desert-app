import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const defaultProps: IconProps = { size: 24, className: 'text-gold-400' };

export function SwordIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 3L21 9.5L18 12.5L15.5 10L10 15.5L12.5 18L9.5 21L3 14.5L6 11.5L8.5 14L14 8.5L11.5 6L14.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M3 21L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ShieldIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L4 7V12C4 16.42 7.4 20.56 12 21.5C16.6 20.56 20 16.42 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 8V14M9 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function BowIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 19C5 12 8 5 18 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 19L18 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2"/>
      <path d="M18 5L21 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19 2H21V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PolearmIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 21L18 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 3L21 6L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function RapierIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2L14 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="12" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function PistolIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8H17L20 5H22V9L19 9V12H15V14L12 17H9V14H7V12H3V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="10" cy="10" r="1" fill="currentColor"/>
    </svg>
  );
}

export function AxeIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 4C10 4 7 5 5 8C3 11 4 14 4 14L10 10L10 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function CannonIcon({ size = 24, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M12 3V5M12 19V21M3 12H5M19 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 4L8.5 6.5M15.5 17.5L17 20M4 7L6.5 8.5M17.5 15.5L20 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

// Map pin icons
export function MapPinCollectible({ size = 20, className = 'text-emerald-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
    </svg>
  );
}

export function MapPinBoss({ size = 20, className = 'text-crimson-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
      <path d="M9 8L12 12L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 20H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MapPinNPC({ size = 20, className = 'text-blue-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
      <path d="M5 20C5 16 8 13 12 13C16 13 19 16 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MapPinPOI({ size = 20, className = 'text-gold-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 2 5 5 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5 16 2 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function MapPinCustom({ size = 20, className = 'text-gray-400' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 2 5 5 5 9C5 14 12 22 12 22C12 22 19 14 19 9C19 5 16 2 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <path d="M10 9H14M12 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Weapon icon lookup by key
export const WEAPON_ICON_MAP: Record<string, React.FC<IconProps>> = {
  sword: SwordIcon,
  shield: ShieldIcon,
  bow: BowIcon,
  polearm: PolearmIcon,
  rapier: RapierIcon,
  pistol: PistolIcon,
  axe: AxeIcon,
  cannon: CannonIcon,
};

export function getWeaponIcon(iconKey: string): React.FC<IconProps> {
  return WEAPON_ICON_MAP[iconKey] || SwordIcon;
}
