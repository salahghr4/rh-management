import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import {
  Banknote,
  Building,
  CalendarCheck,
  CalendarX,
  ChevronFirst,
  ChevronLast,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import iconImg from "../../Assest/img/logoIcon.png";
import { router, usePage } from "@inertiajs/react";
import { Tooltip } from "antd";

export default function Authenticated({ user, header, children }) {
  const [collapsed, setCollapsed] = useState(() =>
    JSON.parse(localStorage.getItem("sidebare_collapsed"))
  ); // Default to collapsed on desktop
  const [toggled, setToggled] = useState(() =>
    JSON.parse(localStorage.getItem("sidebar_toggled"))
  ); // for mobile
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false
  );

  const routePrefix =
    user?.role === "admin" || user?.role === "rh" ? "admin" : "employe";
  const currentRoute = usePage().props.routeName;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
        setToggled(false);
        setIsMobile(true);
        localStorage.setItem("sidebare_collapsed", false);
        localStorage.setItem("sidebar_toggled", false);
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
      localStorage.setItem("sidebar_toggled", !toggled);
      localStorage.setItem("sidebare_collapsed", false);
    } else {
      setCollapsed((prev) => !prev);
      localStorage.setItem("sidebare_collapsed", !collapsed);
    }
  };
  //     const { mode, changeTheme } = useContext(ThemeContext);
  //     const isDark =
  //   mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-black">
        {/* Sidebar */}

        <Sidebar
          breakPoint="md"
          collapsed={collapsed}
          onToggle={setToggled}
          toggled={toggled}
          className="h-full"
          backgroundColor={"#fff"}
          onBackdropClick={() => {
            setToggled(false);
            localStorage.setItem("sidebar_toggled", false);
          }}
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
                  backgroundColor: active ? "#2563eb" : undefined,

                  "&:hover": {
                    backgroundColor: active ? "#3a72ed" : "#2563eb",
                    color: active ? "#fff" : "#fff",
                  },
                };
              },
            }}
          >
            <Tooltip placement="right" title="Dashboard" color="blue">
              <MenuItem
                className="my-3 relative group"
                icon={<LayoutDashboard size={20} />}
                active={currentRoute.includes("dashboard")}
                onClick={() => {
                  router.visit(route(`${routePrefix}.dashboard`));
                }}
              >
                {" "}
                Dashboard
              </MenuItem>
            </Tooltip>
            <Tooltip placement="right" title="Employés" color="blue">
              <MenuItem
                className="my-3"
                icon={<Users size={22} />}
                active={currentRoute.includes("employes")}
                onClick={() => {
                  router.visit(route(`${routePrefix}.employes.index`));
                }}
              >
                {" "}
                Employés
              </MenuItem>
            </Tooltip>
            <Tooltip placement="right" title="Congés" color="blue">
              <MenuItem
                className="my-3"
                icon={<CalendarCheck size={24} />}
                active={currentRoute.includes("conges")}
                onClick={() => {
                  router.visit(route(`${routePrefix}.conges.index`));
                }}
              >
                Congés
              </MenuItem>
            </Tooltip>

            <Tooltip placement="right" title="Paie" color="blue">
              <MenuItem
                className="my-3"
                icon={<Banknote size={20} />}
                active={currentRoute.includes("paie")}
                onClick={() => {
                  router.visit(route(`${routePrefix}.paies.index`));
                }}
              >
                Paies
              </MenuItem>
            </Tooltip>
            {routePrefix === "admin" && (
              <Tooltip placement="right" title="Départements" color="blue">
                <MenuItem
                  className="my-3"
                  icon={<Building size={20} />}
                  active={currentRoute.includes("departements")}
                  onClick={() => {
                    router.visit(route(`${routePrefix}.departements.index`));
                  }}
                >
                  Départements
                </MenuItem>
              </Tooltip>
            )}
            {routePrefix === "admin" && (
              <Tooltip placement="right" title="Absences" color="blue">
                <MenuItem
                  className="my-3"
                  icon={<CalendarX size={20} />}
                  active={currentRoute.includes("absences")}
                  onClick={() => {
                    router.visit(route(`${routePrefix}.absences.index`));
                  }}
                >
                  Absences
                </MenuItem>
              </Tooltip>
            )}
          </Menu>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="z-50 bg-white shadow-md p-4 flex justify-between items-center dark:bg-gray-900">
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
              {/* <select
                    value={mode}
                    onChange={(e) => changeTheme(e.target.value)}
                    className="bg-transparent dark:bg-black  rounded-full border-0 "
                    >
                    <option value="light">☀️</option>
                    <option value="dark">🌙</option>
                    <option value="system">🖥️</option>
                </select> */}
            </div>
            {/* <Users size={18} /> */}
            {/* <input type="text" /> */}
            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button className="w-9 h-9 cursor-pointer rounded-full bg-blue-500 text-white flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                        {user?.nom?.charAt(0).toLocaleUpperCase() +
                          user?.prenom?.charAt(0).toLocaleUpperCase()}
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>
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
          <main className="p-6 overflow-auto flex-1 ">{children}</main>
        </div>
      </div>
    </>
  );
}
