"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { SidebarNavMain } from "./sidebar-nav-main";
import { SidebarNavSecondary } from "./sidebar-nav-secondary";
import { SidebarNavUser } from "./sidebar-user";
import SidebarAppHeader from "./sidebar-app-header";
import { SidebarNavWorkspace } from "./sidebar-nav-workspace";
import { SidebarNavProject } from "./sidebar-nav-project";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarAppHeader />
      <SidebarContent>
        <SidebarNavMain />
        <SidebarNavWorkspace />
        <SidebarNavProject />
        <SidebarNavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
