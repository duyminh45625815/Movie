"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
export default function NavContent({
    items,
  }: {
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
   
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  }) {
      const { isCollapsed } = useSidebar(); 
    return(
<SidebarGroup>
                    <Link href="/dashboards" className="justify-items-center border-l-indigo-50 w-full rounded-2xl border-black">
                        <Image src="/lg1.png" width={50} height={50} className="w-[65px] h-[auto]" alt="Icon" />
                    </Link>
                    <SidebarGroupContent className="border-l-indigo-50 mt-2 p-2 rounded-2xl">
                        <SidebarMenu>
                            {items.map((item, index) =>
                                item.items ? (
                                    <Collapsible key={index} defaultOpen className="group/collapsible">
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.title} className="flex items-center text-base">
                                                    {/* Hiển thị icon dù sidebar collapsed hay không */}
                                                    {item.icon && React.createElement(item.icon, { className: "mr-2" })}
                                                    {/* Chỉ hiển thị text khi sidebar không bị collapsed */}
                                                    {!isCollapsed && <span className="font-medium">{item.title}</span>}
                                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem: { title: string; url: string }) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <Link href={subItem.url}>
                                                                    <span className="text-black text-sm">{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                ) : (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                {item.icon && React.createElement(item.icon)}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
    );
}