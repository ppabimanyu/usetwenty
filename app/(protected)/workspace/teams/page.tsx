"use client";

import { Users } from "lucide-react";
import { WorkspaceTeams } from "./_components/workspace-teams";
import { Separator } from "@/components/ui/separator";

export default function WorkspaceTeamsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <h1 className="text-lg font-medium">Members</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage your workspace members and their access levels
        </p>
      </header>
      <Separator />
      <WorkspaceTeams />
    </div>
  );
}
