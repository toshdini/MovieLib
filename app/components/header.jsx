'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import ThemeSwitcher from "./theme_switcher";

export default function Nav() {
    // TODO: Add search functionality


    // TODO: Add login/register functionality
    return (
        <Navbar maxWidth="full">
            <NavbarContent>
                <NavbarBrand>
                    <Link className="font-bold text-inherit dark:text-white" href="/">MovieLib</Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<CiSearch size={18} />}
                    type="search"
                />
                <div className="flex items-center space-x-4 lg:space-x-6" >
                    <NavbarItem className="hidden lg:flex">
                        <Link href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/register" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </div>

            </NavbarContent>
            <ThemeSwitcher />
        </Navbar>
    );
}
