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
  Box,
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
import Link from "next/link";

const data: Issue[] = [
  {
    id: "1",
    code: "US-1",
    title: "Implement Signup UI",
    priority: PriorityEnum.LOW,
    status: {
      name: "Backlog",
      icon: "BACKLOG",
    },
    startDate: new Date(),
    dueDate: new Date(),
    project: {
      id: "1",
      name: "Project 1",
    },
  },
  {
    id: "2",
    code: "US-2",
    title: "Implement Login UI",
    priority: PriorityEnum.MEDIUM,
    status: {
      name: "In Progress",
      icon: "IN_PROGRESS",
    },
    startDate: new Date(),
    dueDate: new Date(),
    project: {
      id: "1",
      name: "Project 1",
    },
  },
];

export type Issue = {
  id: string;
  code: string;
  title: string;
  priority: PriorityEnum;
  status: {
    name: string;
    icon: string;
  };
  startDate: Date;
  dueDate: Date;
  project: {
    id: string;
    name: string;
  };
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <div className="uppercase text-muted-foreground">
        {row.getValue("code")}
      </div>
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
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "Start Date",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-1 lowercase">
        <Calendar className="size-4" />
        {row.original.startDate.toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "Due Date",
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
      const isOverdue = row.original.dueDate < new Date();
      return (
        <div
          className={`flex items-center gap-1 lowercase ${
            isOverdue ? "text-destructive" : ""
          }`}
        >
          <CalendarOff className="size-4" />
          {row.original.dueDate.toLocaleDateString()}
        </div>
      );
    },
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
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={`/projects/${row.original.project.id}`}
        className="flex items-center gap-1 capitalize text-primary hover:text-primary/80"
      >
        <Box className="size-4" />
        {row.original.project.name}
      </Link>
    ),
  },
];

export function IssuesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [priorityFilters, setPriorityFilters] = React.useState<PriorityEnum[]>(
    []
  );
  const [statusFilters, setStatusFilters] = React.useState<StatusIconEnum[]>(
    []
  );

  const togglePriorityFilter = (priority: PriorityEnum) => {
    setPriorityFilters((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const toggleStatusFilter = (status: StatusIconEnum) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search issues..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter className="size-4" />
              Priority
              {priorityFilters.length > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                  {priorityFilters.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={priorityFilters.includes(PriorityEnum.NONE)}
              onCheckedChange={() => togglePriorityFilter(PriorityEnum.NONE)}
            >
              No Priority
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={priorityFilters.includes(PriorityEnum.LOW)}
              onCheckedChange={() => togglePriorityFilter(PriorityEnum.LOW)}
            >
              Low
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={priorityFilters.includes(PriorityEnum.MEDIUM)}
              onCheckedChange={() => togglePriorityFilter(PriorityEnum.MEDIUM)}
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={priorityFilters.includes(PriorityEnum.HIGH)}
              onCheckedChange={() => togglePriorityFilter(PriorityEnum.HIGH)}
            >
              High
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={priorityFilters.includes(PriorityEnum.CRITICAL)}
              onCheckedChange={() =>
                togglePriorityFilter(PriorityEnum.CRITICAL)
              }
            >
              Critical
            </DropdownMenuCheckboxItem>
            {priorityFilters.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={() => setPriorityFilters([])}
                  className="w-full px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground text-left"
                >
                  Clear filter
                </button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter className="size-4" />
              Status
              {statusFilters.length > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                  {statusFilters.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes(StatusIconEnum.BACKLOG)}
              onCheckedChange={() => toggleStatusFilter(StatusIconEnum.BACKLOG)}
            >
              Backlog
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes(StatusIconEnum.IN_PROGRESS)}
              onCheckedChange={() =>
                toggleStatusFilter(StatusIconEnum.IN_PROGRESS)
              }
            >
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes(StatusIconEnum.REVIEW)}
              onCheckedChange={() => toggleStatusFilter(StatusIconEnum.REVIEW)}
            >
              Review
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes(StatusIconEnum.DONE)}
              onCheckedChange={() => toggleStatusFilter(StatusIconEnum.DONE)}
            >
              Done
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes(StatusIconEnum.CANCELED)}
              onCheckedChange={() =>
                toggleStatusFilter(StatusIconEnum.CANCELED)
              }
            >
              Canceled
            </DropdownMenuCheckboxItem>
            {statusFilters.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={() => setStatusFilters([])}
                  className="w-full px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground text-left"
                >
                  Clear filter
                </button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
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
    </div>
  );
}
