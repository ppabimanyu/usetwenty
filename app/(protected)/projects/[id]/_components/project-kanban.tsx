"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IssuePriority, PriorityEnum } from "@/components/issue-priority";
import { StatusIconEnum } from "@/components/issue-status-item";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock issues data
const mockIssues = [
  {
    id: "1",
    code: "PRJ-1",
    title: "Setup project structure",
    priority: PriorityEnum.HIGH,
    status: StatusIconEnum.DONE,
    assignee: { name: "John Doe", avatar: "" },
  },
  {
    id: "2",
    code: "PRJ-2",
    title: "Implement authentication",
    priority: PriorityEnum.CRITICAL,
    status: StatusIconEnum.IN_PROGRESS,
    assignee: { name: "Jane Smith", avatar: "" },
  },
  {
    id: "3",
    code: "PRJ-3",
    title: "Design database schema",
    priority: PriorityEnum.MEDIUM,
    status: StatusIconEnum.IN_PROGRESS,
    assignee: { name: "Bob Johnson", avatar: "" },
  },
  {
    id: "4",
    code: "PRJ-4",
    title: "Create API endpoints",
    priority: PriorityEnum.LOW,
    status: StatusIconEnum.BACKLOG,
    assignee: null,
  },
  {
    id: "5",
    code: "PRJ-5",
    title: "Write unit tests",
    priority: PriorityEnum.MEDIUM,
    status: StatusIconEnum.BACKLOG,
    assignee: { name: "Alice Brown", avatar: "" },
  },
  {
    id: "6",
    code: "PRJ-6",
    title: "Code review",
    priority: PriorityEnum.NONE,
    status: StatusIconEnum.REVIEW,
    assignee: { name: "Charlie Wilson", avatar: "" },
  },
  {
    id: "7",
    code: "PRJ-7",
    title: "Deploy to staging",
    priority: PriorityEnum.HIGH,
    status: StatusIconEnum.REVIEW,
    assignee: { name: "John Doe", avatar: "" },
  },
  {
    id: "8",
    code: "PRJ-8",
    title: "Deprecated feature removal",
    priority: PriorityEnum.LOW,
    status: StatusIconEnum.CANCELED,
    assignee: null,
  },
];

const columns = [
  { id: StatusIconEnum.BACKLOG, name: "Backlog", color: "bg-gray-500" },
  { id: StatusIconEnum.IN_PROGRESS, name: "In Progress", color: "bg-blue-500" },
  { id: StatusIconEnum.REVIEW, name: "Review", color: "bg-amber-500" },
  { id: StatusIconEnum.DONE, name: "Done", color: "bg-green-500" },
  { id: StatusIconEnum.CANCELED, name: "Canceled", color: "bg-red-500" },
];

type ProjectKanbanProps = {
  projectId: string;
};

export function ProjectKanban({ projectId }: ProjectKanbanProps) {
  const getIssuesByStatus = (status: StatusIconEnum) => {
    return mockIssues.filter((issue) => issue.status === status);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const issues = getIssuesByStatus(column.id);
        return (
          <div
            key={column.id}
            className="flex-shrink-0 w-72 bg-muted/50 rounded-lg"
          >
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${column.color}`} />
                <span className="font-medium text-sm">{column.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {issues.length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="size-7">
                <Plus className="size-4" />
              </Button>
            </div>
            <div className="p-2 space-y-2 min-h-[200px]">
              {issues.map((issue) => (
                <Card
                  key={issue.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs text-muted-foreground">
                        {issue.code}
                      </span>
                      <IssuePriority value={issue.priority} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {issue.title}
                    </p>
                    {issue.assignee && (
                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="size-5">
                          <AvatarImage
                            src={issue.assignee.avatar}
                            alt={issue.assignee.name}
                          />
                          <AvatarFallback className="text-[10px]">
                            {issue.assignee.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {issue.assignee.name}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {issues.length === 0 && (
                <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                  No issues
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
