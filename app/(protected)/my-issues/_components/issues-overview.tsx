import React from "react";

export default function IssuesOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div className="flex flex-col items-start justify-center gap-2 border h-25 p-4 rounded-md bg-card">
        <span className="text-sm font-medium">All Issues</span>
        <span className="text-sm font-medium">10</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 border h-25 p-4 rounded-md bg-card">
        <span className="text-sm font-medium">Created Issues</span>
        <span className="text-sm font-medium">10</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 border h-25 p-4 rounded-md bg-card">
        <span className="text-sm font-medium">Assigned Issues</span>
        <span className="text-sm font-medium">10</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-2 border h-25 p-4 rounded-md bg-card">
        <span className="text-sm font-medium">Overdue Issues</span>
        <span className="text-sm font-medium">10</span>
      </div>
    </div>
  );
}
