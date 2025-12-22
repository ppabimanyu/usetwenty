"use client";

import { Box } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navProject: {
  id: string;
  name: string;
}[] = [
  {
    id: "1",
    name: "Project 1",
  },
  {
    id: "2",
    name: "Project 2",
  },
];

export function SidebarNavProject() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarMenu>
        {navProject.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={pathname === `/projects/${item.id}`}
            >
              <Link href={`/projects/${item.id}`}>
                <Box className="size-4" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
