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
import { SidebarNavWorkspace } from "./sidebar-nav-workspace";
import { SidebarNavProject } from "./sidebar-nav-project";
import { SidebarWorkspaceSwitcher } from "./sidebar-workspace-switcher";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      {/* <SidebarAppHeader /> */}
      <SidebarWorkspaceSwitcher />
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
