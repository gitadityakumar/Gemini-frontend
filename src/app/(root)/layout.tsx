"use client";
import React, { useState,ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconCpu 
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
// import Image from "next/image";
import { cn } from "@/lib/utils";
import CustomSignOutButton from "@/components/blocks/CustomSignOutButton";
import { useUser } from "@clerk/nextjs";



export default function Layout({ children }: Readonly<{children: ReactNode}>) {
  const { user } = useUser();
  const firstName = user?.firstName ;
  const lastName = user?.lastName ;
  const fullName = firstName + " " + lastName ;
  
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Processed",
      href: "/processed",
      icon: (
        <IconCpu className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      // No href here because we're using a custom component
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <CustomSignOutButton />
    },
  ];
  
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              
              <LogoIcon />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
          <SidebarLink
              link={{
             label: `${fullName}`,
            href: "/#",
             }}
             className="items-center "
             >
 
</SidebarLink>


          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      {children}
    </div>
  );
}
// export const Logo = () => {
//   return (
//     <Link
//       href="/"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black dark:text-white whitespace-pre"
//       >
//          Perpetuity corp.
//       </motion.span>
//     </Link>
//   );
// };
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      
      <div className="w-32  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" className="w-full h-auto">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
                  </linearGradient>
                </defs>
                <rect width="200" height="60" fill="none"/>
                <text x="10" y="45" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="url(#gradient)">Means</text>
                <path d="M185 10 L190 15 L185 20" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
                <path d="M180 10 L185 15 L180 20" stroke="url(#gradient)" strokeWidth="3" fill="none"/>
      </svg>
      
      </div>
    </Link>
  );
};

