"use client";

import { Separator } from "@/components/ui/separator";
import { WorkspaceSettingsInfo } from "./workspace-settings-info";
import { WorkspaceSettingsDanger } from "./workspace-settings-danger";

export function WorkspaceSettings() {
  return (
    <div className="space-y-6 md:space-y-4">
      <WorkspaceSettingsInfo />
      <Separator />
      <WorkspaceSettingsDanger />
    </div>
  );
}
