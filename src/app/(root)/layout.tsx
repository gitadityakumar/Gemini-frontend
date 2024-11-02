"use client";
import React, { useState,ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconLogout2,
  IconBrandTabler,
  IconSettings,
  IconCpu ,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {LogoIcon} from "@/components/ui/LogoIcon"
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
        <IconLogout2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <CustomSignOutButton />
    },
  ];
  
  const [open, setOpen] = useState(false);
  return (
     
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full  flex-1   border  border-neutral-200 dark:border-neutral-700 overflow-x-hidden",
        "h-full " 
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
              label: ` Daily quota :    ${JSON.stringify(user?.publicMetadata.currentCount)} / ${JSON.stringify(user?.publicMetadata.limit)}`,
              href: "#",
              }}
  className="backdrop-blur-sm bg-white/20 p-3 mb-4 rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 "
  textClassName="text-transparent   bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
>
          </SidebarLink>
          <SidebarLink
            link={{
              label: ` Hello ${fullName}`,
              href: "#",
              
              }}
  className="backdrop-blur-sm bg-white/20 p-3 rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 "
  textClassName="text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
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