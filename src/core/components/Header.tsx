import { Box, Typography } from "./ui";

export function Header() {
  return (
    <Box className="fixed inset-x-0 top-0 z-header flex h-header items-center gap-3 bg-primary px-6 shadow-sm">
      <Typography
        variant="h1"
        className="text-2xl font-bold text-primary-foreground"
      >
        ToothSystem
      </Typography>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary-foreground"
        aria-hidden="true"
      >
        <path d="M10 20.75c-1.4-1.03-2-2.74-2-4.35v-3.5c0-1.62-.6-3.33-2-4.35A3.5 3.5 0 0 1 8.5 2h7a3.5 3.5 0 0 1 2.5 6.55c-1.4 1.02-2 2.73-2 4.35v3.5c0 1.62-.6 3.33-2 4.35" />
        <path d="M12 11v9" />
      </svg>
    </Box>
  );
}
