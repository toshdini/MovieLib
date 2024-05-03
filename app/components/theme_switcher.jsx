"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            className="relative w-16 h-8 flex items-center
                dark:bg-gray-900 bg-teal-500 cursor-pointer
                rounded-full p-1"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <FaMoon className="text-white" size={18} />
            <div
                className="absolute bg-white dark:bg-medium 
                w-6 h-6 rounded-full shadow-md transform 
                transition-transform duration-300"
                style={theme === "dark" ? { left: "2px" } : { right: "2px" }}
            ></div>

            <BsSunFill
                className="ml-auto text-yellow-400"
                size={18}
            />
        </div>
    )
}