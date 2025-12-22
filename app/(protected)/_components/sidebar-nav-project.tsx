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
}[] = [];

const navProjectItems = () => {
  const data: {
    id: string;
    name: string;
  }[] = [];
  for (let i = 1; i <= 20; i++) {
    data.push({
      id: i.toString(),
      name: `Project ${i}`,
    });
  }
  return data;
};

export function SidebarNavProject() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarMenu>
        {navProjectItems().map((item) => (
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
