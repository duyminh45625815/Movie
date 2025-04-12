"use client";
import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon, Popcorn,Ticket } from "lucide-react";
import { User } from 'lucide-react';
import { Video } from 'lucide-react';
import { Theater } from 'lucide-react';
import { Clapperboard } from 'lucide-react';
import React from "react";
import NavContent from "./ui/nav.content";

export function AppSidebar() {
   const data={ 
    navcontent:  [{
        title: "Film",
        url: "/flims",
        icon: Clapperboard,

      },
      {
        title: "Showtimes",
        url: "/showtimes",
        icon: Video,
      },
      {
        title: "Customer",
        url: "/customers",
        icon: User,
      },
      {
        title: "Branchs",
        url: "/theaters",
        icon: Theater
      },
      {
        title:"Food",
        url:"/foods",
        icon:Popcorn
      },
      {
        title:"Ticket",
        url: '/tickets',
        icon: Ticket
      }
      ]}
    return (
        <Sidebar>
            <SidebarContent className="bg-gradient-to-r from-[#1230AE] to-[#C68FE6]  text-white shadow-lg">
                <NavContent items={data.navcontent}/>
            </SidebarContent>
        </Sidebar>
    );
}
