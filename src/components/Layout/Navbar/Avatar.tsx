"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { authController } from "@/controllers/AuthController";
import { useRouter } from "next/navigation";
import { userController } from "@/controllers/UserController";

export function Avatar() {
  const [open, setOpen] = useState(false);
  const [avatarImage, setAvatarImage] = useState("/user.png")
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        userController.setShowToast(false)
        const image = await userController.getMyPhoto();
        userController.setShowToast(true)
        if (image !== null) {
          const imageSrc = `data:image/jpeg;base64,${image}`;
          setAvatarImage(imageSrc);
        }
      } catch (error) {
        console.error("Failed to load avatar image:", error);
      }
    };
    getImage();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authController.logout();
    router.push("/login");
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-transparent hover:border-white transition"
      >
        <Image
          src={avatarImage}
          alt="Avatar"
          width={32}
          height={32}
          className="object-cover"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-md shadow-lg border border-zinc-200 dark:border-zinc-700 z-50">
          <ul className="py-2 text-sm text-gray-800 dark:text-gray-100 cursor-pointer">
            <li>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}