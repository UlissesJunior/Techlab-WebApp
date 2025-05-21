"use client"

import { useEffect, useRef, useState } from "react"
import { Moon, Sun, Laptop } from "lucide-react"

const themes = [
  { label: "Sistema", value: "system", icon: Laptop },
  { label: "Claro", value: "light", icon: Sun },
  { label: "Escuro", value: "dark", icon: Moon },
]

export function ThemeToggle() {
  const [theme, setTheme] = useState("system")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system"
    setTheme(saved)
    applyTheme(saved)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const applyTheme = (value: string) => {
    const root = window.document.documentElement
    if (value === "dark") {
      root.classList.add("dark")
    } else if (value === "light") {
      root.classList.remove("dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.toggle("dark", prefersDark)
    }
  }

  const handleChange = (value: string) => {
    setTheme(value)
    localStorage.setItem("theme", value)
    applyTheme(value)
    setOpen(false)
  }

  const CurrentIcon = themes.find((t) => t.value === theme)?.icon ?? Laptop

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Trocar tema"
      >
        <CurrentIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 z-50">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {themes.map(({ value, label, icon: Icon }) => (
              <li key={value}>
                <button
                  onClick={() => handleChange(value)}
                  className="flex items-center justify-between cursor-pointer w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </div>
                  {theme === value && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}