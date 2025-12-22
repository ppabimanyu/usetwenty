import { Form } from "lucide-react";
import React from "react";
import IssuesOverview from "./_components/issues-overview";
import { IssuesTable } from "./_components/issues-table";

export default function MyIssues() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Form className="size-5" />
          <h1 className="text-lg font-medium">My Issues</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          View and track all issues assigned to you across projects
        </p>
      </header>
      <IssuesOverview />
      <IssuesTable />
    </div>
  );
}
