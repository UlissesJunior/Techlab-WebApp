import Image from "next/image";
import Link from "next/link";

export function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center gap-4">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <span className="text-lg font-semibold text-foreground hidden sm:inline">
        Finance
      </span>
    </Link>
  );
}