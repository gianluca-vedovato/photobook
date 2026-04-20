import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg)">
      <nav
        aria-label="Navigazione principale"
        className="page-wrap flex items-center justify-between gap-x-3 py-3 sm:py-4"
      >
        <h2 className="m-0 shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 text-sm shadow-[0_8px_24px_rgba(0,0,0,0.08)] no-underline sm:px-4 sm:py-2"
          >
            <BookOpen className="h-4 w-4" />
            Photobook
          </Link>
        </h2>

        <div className="hidden items-center gap-x-4 text-sm font-semibold md:flex">
          <Link
            to="/configure"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
            activeOptions={{ exact: true }}
          >
            Configura
          </Link>
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
