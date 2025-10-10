// import { HomeIcon, FileTextIcon, BarChartIcon, SettingsIcon } from "@radix-ui/react-icons";
// If you don't have @radix-ui/react-icons installed, you can use placeholder icons or your own SVGs.
// Example using simple SVG components:

const HomeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9.5L10 3l7 6.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 17V12h2v5" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="3" width="12" height="14" rx="2" />
    <line x1="8" y1="7" x2="12" y2="7" />
    <line x1="8" y1="11" x2="12" y2="11" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="10" width="4" height="7" />
    <rect x="8" y="6" width="4" height="11" />
    <rect x="13" y="2" width="4" height="15" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="10" cy="10" r="3" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.93 4.93l1.41 1.41M14.66 14.66l1.41 1.41M4.93 15.07l1.41-1.41M14.66 5.34l1.41-1.41" />
  </svg>
);

export const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: FileTextIcon,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChartIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];
