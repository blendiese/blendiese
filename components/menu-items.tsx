"use client";

import Link from "next/dist/client/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MenuItems() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Home" },
    {
      href: "/dashboard/settings",
      label: "Settings",
      subLinks: [
        { href: "/dashboard/settings/general", label: "General" },
        { href: "/dashboard/settings/github", label: "Github" },
      ],
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      subLinks: [
        { href: "/dashboard/profile/password", label: "Password" },
        { href: "/dashboard/profile/account", label: "Account" },
      ],
    },
  ];
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    links.forEach((link) => {
      if (link.subLinks && pathname.startsWith(link.href)) {
        initialState[link.href] = true;
      }
    });
    return initialState;
  });

  const handleToggle = (href: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <div className="flex flex-col gap-6 ml-2">
      {links.map((link) =>
        link.subLinks ? (
          <div key={link.href} className="w-full flex flex-col">
            <button
              className={`hover:underline w-full text-left ${pathname.startsWith(link.href) ? "font-bold underline" : ""}`}
              onClick={() => handleToggle(link.href)}
              type="button"
            >
              {link.label}
            </button>
            {openMenus[link.href] && (
              <div className="mt-4 ml-4 flex flex-col gap-2 w-full">
                {link.subLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`hover:underline ${pathname === sub.href ? "font-bold underline" : ""}`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:underline ${pathname === link.href ? "font-bold underline" : ""}`}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}
