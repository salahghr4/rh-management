import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import {
    Banknote,
    CalendarCheck,
    ChevronFirst,
    ChevronLast,
    LayoutDashboard,
    Users,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import iconImg from "../../Assest/img/logoIcon.png";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Authenticated({ user, header, children }) {
    const [collapsed, setCollapsed] = useState(false); // Default to collapsed on desktop
    const [toggled, setToggled] = useState(false); // for mobile
    const [isMobile, setIsMobile] = useState(
        window.innerWidth < 768 ? true : false
    ); // Check if the screen is mobile size

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCollapsed(false);
                setToggled(false);
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const title =
        window.location.pathname.split("/")[1].charAt(0).toLocaleUpperCase() +
        window.location.pathname.split("/")[1].slice(1);

    const handleToggle = () => {
        if (isMobile) {
            setCollapsed(false);
            setToggled((prev) => !prev);
        } else {
            setCollapsed((prev) => !prev);
        }
    };
    const { mode, changeTheme } = useContext(ThemeContext);
    const isDark =
  mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return (
        <>
            <div className="flex h-screen bg-gray-100 dark:bg-black">
                {/* Sidebar */}

                <Sidebar
                    breakPoint="md"
                    collapsed={collapsed}
                    onToggle={setToggled}
                    toggled={toggled}
                    className="h-full"
                    backgroundColor={isDark ? '#000' : '#ffff'}
                    onBackdropClick={() => setToggled(false)}
                >
                    <div className="p-5">
                        {collapsed ? (
                            <img src={iconImg} className="fill-current" />
                        ) : (
                            <ApplicationLogo className="" />
                        )}
                    </div>
                    <Menu
                        menuItemStyles={{
                            button: ({ active }) => {
                                return {
                                    color: active ? "#fff" : "#2563eb",
                                    backgroundColor: active
                                        ? "#2563eb"
                                        : undefined,

                                    "&:hover": {
                                        backgroundColor: active
                                            ? "#3a72ed"
                                            : "#2563eb",
                                        color: active ? "#fff" : "#fff",
                                    },
                                };
                            },
                        }}
                    >
                        <MenuItem
                            className="my-3 relative group"
                            icon={<LayoutDashboard size={20} />}
                            active={window.location.pathname === "/dashboard"}
                        >
                            {" "}
                            Dashboard
                        </MenuItem>
                        <MenuItem className="my-3" icon={<Users size={22} />}>
                            {" "}
                            Employées
                        </MenuItem>

                        <MenuItem
                            className="my-3"
                            icon={<CalendarCheck size={24} />}
                        >
                            Congés
                        </MenuItem>

                        <MenuItem
                            className="my-3"
                            icon={<Banknote size={20} />}
                        >
                            Paies
                        </MenuItem>
                    </Menu>
                </Sidebar>

                {/* Main Content */}
                <div className="flex-1 flex-col relative z-10">
                    {/* Header */}
                    <header className="bg-white shadow-md p-4 flex justify-between items-center dark:bg-gray-900">
                        <div className="flex gap-5 items-center">
                            <button
                                onClick={handleToggle}
                                className="p-2 bg-white rounded shadow dark:bg-slate-800 dark:text-white"
                            >
                                {isMobile ? (
                                    <ChevronLast />
                                ) : collapsed ? (
                                    <ChevronLast />
                                ) : (
                                    <ChevronFirst />
                                )}
                            </button>
                            <h1 className="text-xl font-bold ">{title}</h1>
                <select
                    value={mode}
                    onChange={(e) => changeTheme(e.target.value)}
                    className="bg-transparent dark:bg-black  rounded-full border-0 "
                    >
                    <option value="light">☀️</option>
                    <option value="dark">🌙</option>
                    <option value="system">🖥️</option>
                </select>
                        </div>
                        {/* <Users size={18} /> */}
                        {/* <input type="text" /> */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md ">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 dark:bg-black dark:text-white"
                                            >
                                                <img
                                                    src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                                                    className="w-8 rounded-full"
                                                    alt="Avatar"
                                                />
                                                &emsp;{user.nom}
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-6 overflow-auto ">{children}</main>
                </div>
            </div>
        </>
    );
}
