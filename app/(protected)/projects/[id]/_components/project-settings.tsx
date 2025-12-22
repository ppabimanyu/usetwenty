"use client";

import { Separator } from "@/components/ui/separator";
import { ProjectSettingsInfo } from "./project-settings-info";
import { ProjectSettingsDanger } from "./project-settings-danger";

type ProjectSettingsProps = {
  projectId: string;
};

export function ProjectSettings({ projectId }: ProjectSettingsProps) {
  return (
    <div className="space-y-6 md:space-y-4">
      <ProjectSettingsInfo projectId={projectId} />
      <Separator />
      <ProjectSettingsDanger projectId={projectId} />
    </div>
  );
}
