"use client";

import { Settings } from "lucide-react";
import { WorkspaceSettings } from "./_components/workspace-settings";
import { Separator } from "@/components/ui/separator";

export default function WorkspaceSettingsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="size-5" />
          <h1 className="text-lg font-medium">Workspace Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Configure your workspace preferences and general settings
        </p>
      </header>
      <Separator />
      <WorkspaceSettings />
    </div>
  );
}
