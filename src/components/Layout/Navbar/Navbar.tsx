import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar } from "./Avatar";

export function Navbar() {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-6 md:px-8 lg:px-10 mx-auto">
        <div className="flex items-center gap-6 md:gap-8">
          <NavbarLogo />
          <div className="hidden sm:flex">
            <NavbarLinks />
          </div>
        </div>
        <div className="sm:hidden items-center">
          <NavbarLinks />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex">
            <ThemeToggle />
          </div>
          <Avatar />
        </div>
      </div>
    </header>
  );
}