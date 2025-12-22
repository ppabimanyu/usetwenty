"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  CalendarOff,
  ListFilter,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IssuePriority, PriorityEnum } from "@/components/issue-priority";
import {
  IssueStatusItem,
  StatusIconEnum,
} from "@/components/issue-status-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Issue = {
  id: string;
  code: string;
  title: string;
  priority: PriorityEnum;
  status: {
    name: string;
    icon: string;
  };
  assignee: {
    name: string;
    avatar: string;
  } | null;
  dueDate: Date | null;
};

const mockData: Issue[] = [
  {
    id: "1",
    code: "PRJ-1",
    title: "Setup project structure",
    priority: PriorityEnum.HIGH,
    status: { name: "Done", icon: "DONE" },
    assignee: { name: "John Doe", avatar: "" },
    dueDate: new Date("2024-12-20"),
  },
  {
    id: "2",
    code: "PRJ-2",
    title: "Implement authentication",
    priority: PriorityEnum.CRITICAL,
    status: { name: "In Progress", icon: "IN_PROGRESS" },
    assignee: { name: "Jane Smith", avatar: "" },
    dueDate: new Date("2024-12-25"),
  },
  {
    id: "3",
    code: "PRJ-3",
    title: "Design database schema",
    priority: PriorityEnum.MEDIUM,
    status: { name: "In Progress", icon: "IN_PROGRESS" },
    assignee: { name: "Bob Johnson", avatar: "" },
    dueDate: new Date("2024-12-28"),
  },
  {
    id: "4",
    code: "PRJ-4",
    title: "Create API endpoints",
    priority: PriorityEnum.LOW,
    status: { name: "Backlog", icon: "BACKLOG" },
    assignee: null,
    dueDate: null,
  },
  {
    id: "5",
    code: "PRJ-5",
    title: "Write unit tests",
    priority: PriorityEnum.MEDIUM,
    status: { name: "Backlog", icon: "BACKLOG" },
    assignee: { name: "Alice Brown", avatar: "" },
    dueDate: new Date("2025-01-05"),
  },
];

const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="font-mono text-muted-foreground">
        {row.getValue("code")}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <IssuePriority value={row.getValue("priority")} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <IssueStatusItem
        value={row.original.status.icon as StatusIconEnum}
        name={row.original.status.name}
      />
    ),
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      if (!assignee) {
        return <span className="text-muted-foreground">Unassigned</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={assignee.avatar} alt={assignee.name} />
            <AvatarFallback className="text-[10px]">
              {assignee.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{assignee.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      if (!dueDate) {
        return (
          <div className="flex items-center gap-1 text-muted-foreground">
            <CalendarOff className="size-4" />
            <span>No date</span>
          </div>
        );
      }
      const isOverdue = dueDate < new Date();
      return (
        <div
          className={`flex items-center gap-1 ${
            isOverdue ? "text-destructive" : ""
          }`}
        >
          <Calendar className="size-4" />
          <span>{dueDate.toLocaleDateString()}</span>
        </div>
      );
    },
  },
];

type ProjectTableProps = {
  projectId: string;
};

export function ProjectTable({ projectId }: ProjectTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: mockData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 className="size-4" /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-card">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="first:pl-4 last:pr-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="first:pl-4 last:pr-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No issues found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
