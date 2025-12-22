"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IssuePriority, PriorityEnum } from "@/components/issue-priority";
import {
  IssueStatusItem,
  StatusIconEnum,
} from "@/components/issue-status-item";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock issues data
const mockIssues = [
  {
    id: "1",
    code: "PRJ-1",
    title: "Setup project structure",
    priority: PriorityEnum.HIGH,
    status: StatusIconEnum.DONE,
    statusName: "Done",
    assignee: { name: "John Doe", avatar: "" },
    dueDate: new Date("2024-12-20"),
  },
  {
    id: "2",
    code: "PRJ-2",
    title: "Implement authentication",
    priority: PriorityEnum.CRITICAL,
    status: StatusIconEnum.IN_PROGRESS,
    statusName: "In Progress",
    assignee: { name: "Jane Smith", avatar: "" },
    dueDate: new Date("2024-12-25"),
  },
  {
    id: "3",
    code: "PRJ-3",
    title: "Design database schema",
    priority: PriorityEnum.MEDIUM,
    status: StatusIconEnum.IN_PROGRESS,
    statusName: "In Progress",
    assignee: { name: "Bob Johnson", avatar: "" },
    dueDate: new Date("2024-12-28"),
  },
  {
    id: "4",
    code: "PRJ-4",
    title: "Create API endpoints",
    priority: PriorityEnum.LOW,
    status: StatusIconEnum.BACKLOG,
    statusName: "Backlog",
    assignee: null,
    dueDate: null,
  },
  {
    id: "5",
    code: "PRJ-5",
    title: "Write unit tests",
    priority: PriorityEnum.MEDIUM,
    status: StatusIconEnum.BACKLOG,
    statusName: "Backlog",
    assignee: { name: "Alice Brown", avatar: "" },
    dueDate: new Date("2025-01-05"),
  },
  {
    id: "6",
    code: "PRJ-6",
    title: "Code review",
    priority: PriorityEnum.NONE,
    status: StatusIconEnum.REVIEW,
    statusName: "Review",
    assignee: { name: "Charlie Wilson", avatar: "" },
    dueDate: new Date("2024-12-22"),
  },
];

const statusGroups = [
  { id: StatusIconEnum.IN_PROGRESS, name: "In Progress" },
  { id: StatusIconEnum.BACKLOG, name: "Backlog" },
  { id: StatusIconEnum.REVIEW, name: "Review" },
  { id: StatusIconEnum.DONE, name: "Done" },
  { id: StatusIconEnum.CANCELED, name: "Canceled" },
];

type ProjectListProps = {
  projectId: string;
};

export function ProjectList({ projectId }: ProjectListProps) {
  const [openGroups, setOpenGroups] = useState<StatusIconEnum[]>(
    statusGroups.map((g) => g.id)
  );

  const toggleGroup = (status: StatusIconEnum) => {
    setOpenGroups((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const getIssuesByStatus = (status: StatusIconEnum) => {
    return mockIssues.filter((issue) => issue.status === status);
  };

  return (
    <div className="space-y-4">
      {statusGroups.map((group) => {
        const issues = getIssuesByStatus(group.id);
        const isOpen = openGroups.includes(group.id);

        return (
          <Collapsible
            key={group.id}
            open={isOpen}
            onOpenChange={() => toggleGroup(group.id)}
          >
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isOpen ? (
                        <ChevronDown className="size-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="size-4 text-muted-foreground" />
                      )}
                      <IssueStatusItem value={group.id} name={group.name} />
                      <Badge variant="secondary">{issues.length}</Badge>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {issues.length > 0 ? (
                    <div className="divide-y">
                      {issues.map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center justify-between py-3 hover:bg-muted/30 px-2 -mx-2 rounded cursor-pointer"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <span className="text-xs text-muted-foreground font-mono w-16 shrink-0">
                              {issue.code}
                            </span>
                            <span className="text-sm truncate flex-1">
                              {issue.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <IssuePriority value={issue.priority} />
                            {issue.dueDate && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="size-3" />
                                {issue.dueDate.toLocaleDateString()}
                              </div>
                            )}
                            {issue.assignee ? (
                              <Avatar className="size-6">
                                <AvatarImage
                                  src={issue.assignee.avatar}
                                  alt={issue.assignee.name}
                                />
                                <AvatarFallback className="text-[10px]">
                                  {issue.assignee.name
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="size-6" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      No issues in this status
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}
