import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, navLinks } from "@/config/site";
import { Menu, X, FileStack } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors"
        >
          <FileStack className="h-5 w-5 text-blue-600" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-slate-900 font-semibold underline underline-offset-4 decoration-blue-600 decoration-2"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden items-center gap-3 md:flex shrink-0">
          <Button asChild size="sm" variant="default" className="whitespace-nowrap">
            <Link href="/tools">All Tools</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-1.5 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-slate-200 bg-white md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Button asChild size="sm" className="w-full">
                <Link href="/tools" onClick={() => setOpen(false)}>
                  All Tools
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
