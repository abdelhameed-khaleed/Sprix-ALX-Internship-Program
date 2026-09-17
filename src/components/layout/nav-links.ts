export type NavItem = {
  href: string;
  label: string;
};

// Shared by the client Header/MobileNav and the server Footer, so it must not live in a "use client" module.
export const NAV_LINKS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/program", label: "Program" },
  { href: "/resources", label: "Resources" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/support", label: "Support" },
];
