"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Minhas Transações" },
];

export function NavbarLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 text-sm text-muted-foreground">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "transition-colors hover:text-foreground",
            pathname === link.href && "text-foreground font-medium"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}