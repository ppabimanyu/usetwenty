"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";
import { ProjectKanban } from "./_components/project-kanban";
import { ProjectList } from "./_components/project-list";
import { ProjectTable } from "./_components/project-table";
import { ProjectSettings } from "./_components/project-settings";

// Mock project data - in real app this would come from API
const getProject = (id: string) => ({
  id,
  name: `Project ${id}`,
  code: `PRJ-${id}`,
  description: "A sample project for demonstration purposes",
});

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeView = (searchParams.get("view") as string) || "kanban";
  const project = getProject(id);

  const handleChangeView = (view: string) => {
    router.push(`/projects/${id}?view=${view}`);
  };

  return (
    <div className="space-y-4 h-full">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Box className="size-5" />
          <h1 className="text-lg font-medium">{project.name}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{project.description}</p>
      </header>
      <Tabs
        className="w-full h-full"
        value={activeView}
        onValueChange={(value) => handleChangeView(value)}
      >
        <div className="w-full border-b">
          <TabsList
            variant={"line"}
            defaultValue={activeView}
            className="w-full max-w-fit overflow-x-scroll overflow-y-hidden"
          >
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <div className="py-6 h-full">
          <TabsContent value="kanban" className="h-full">
            <ProjectKanban projectId={id} />
          </TabsContent>
          <TabsContent value="list" className="h-full">
            <ProjectList projectId={id} />
          </TabsContent>
          <TabsContent value="table" className="h-full">
            <ProjectTable projectId={id} />
          </TabsContent>
          <TabsContent value="settings" className="h-full">
            <ProjectSettings projectId={id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
