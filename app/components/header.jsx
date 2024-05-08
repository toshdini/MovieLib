'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Avatar } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter} from "next/navigation";

import ThemeSwitcher from "./theme_switcher";
import { createClient } from "@/utils/supabase/client";

export default function Nav() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    // TODO: Add search functionality

    const supabase = createClient();
    useEffect(() => {
        async function getUser() {
            const { data, error} =  await supabase.auth.getSession();
            setUser(data.user);
        }

        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null);
    }

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
                    {!user ? (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Link href="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button as={Link} color="primary" href="/login" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    ) : (
                        <>
                            <NavbarContent as="div" justify="end">
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            color="secondary"
                                            name="Jason Hughes"
                                            size="sm"
                                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="profile" className="h-14 gap-2">
                                            <p className="font-semibold">Signed in as</p>
                                            <p className="font-semibold">{user.email}</p>
                                        </DropdownItem>
                                        <DropdownItem key="wacthlist">My Watchlist</DropdownItem>
                                        <DropdownItem key="delete_account" color="danger">Delete my account</DropdownItem>
                                        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavbarContent>
                        </>
                    )}
                </div>

            </NavbarContent>
            <ThemeSwitcher />
        </Navbar>
    );
}
