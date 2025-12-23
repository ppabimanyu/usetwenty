"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/loading-button";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

export function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);

  const workspaceForm = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .min(3, "Name must be at least 3 characters")
          .max(50, "Name must be at most 50 characters"),
        description: z
          .string()
          .max(200, "Description must be at most 200 characters"),
      }),
    },
    onSubmit: async ({ value }) => {
      // TODO: Implement workspace creation API
      console.log("Creating workspace:", value);
      toast.success("Workspace created successfully");
      handleOpenChange(false);
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      workspaceForm.reset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-2 p-2 rounded-sm hover:bg-accent cursor-pointer">
          <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
            <Plus className="size-4" />
          </div>
          <span className="text-muted-foreground font-medium">
            Add workspace
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects and collaborate
            with your team.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <workspaceForm.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="workspaceName">Workspace Name</FieldLabel>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Enter workspace name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                />
                <FieldError errors={field.state.meta.errors} />
                <FieldDescription>
                  Choose a descriptive name for your workspace.
                </FieldDescription>
              </Field>
            )}
          </workspaceForm.Field>
          <workspaceForm.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="workspaceDescription">
                  Description
                </FieldLabel>
                <Textarea
                  id="workspaceDescription"
                  placeholder="Enter workspace description (optional)"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={3}
                />
                <FieldError errors={field.state.meta.errors} />
                <FieldDescription>
                  Add a brief description of what this workspace is about.
                </FieldDescription>
              </Field>
            )}
          </workspaceForm.Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <workspaceForm.Subscribe
            selector={(state) => [state.isSubmitting, state.canSubmit]}
          >
            {([isSubmitting, canSubmit]) => (
              <LoadingButton
                type="button"
                onClick={() => workspaceForm.handleSubmit()}
                isLoading={isSubmitting}
                disabled={!canSubmit}
              >
                Create Workspace
              </LoadingButton>
            )}
          </workspaceForm.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
