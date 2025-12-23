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

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);

  const projectForm = useForm({
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
      // TODO: Implement project creation API
      console.log("Creating project:", value);
      toast.success("Project created successfully");
      handleOpenChange(false);
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      projectForm.reset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Plus className="size-4 cursor-pointer hover:text-foreground transition-colors" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize your tasks and collaborate with
            your team.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <projectForm.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="projectName">Project Name</FieldLabel>
                <Input
                  id="projectName"
                  type="text"
                  placeholder="Enter project name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="off"
                />
                <FieldError errors={field.state.meta.errors} />
                <FieldDescription>
                  Choose a descriptive name for your project.
                </FieldDescription>
              </Field>
            )}
          </projectForm.Field>
          <projectForm.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="projectDescription">
                  Description
                </FieldLabel>
                <Textarea
                  id="projectDescription"
                  placeholder="Enter project description (optional)"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={3}
                />
                <FieldError errors={field.state.meta.errors} />
                <FieldDescription>
                  Add a brief description of what this project is about.
                </FieldDescription>
              </Field>
            )}
          </projectForm.Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <projectForm.Subscribe
            selector={(state) => [state.isSubmitting, state.canSubmit]}
          >
            {([isSubmitting, canSubmit]) => (
              <LoadingButton
                type="button"
                onClick={() => projectForm.handleSubmit()}
                isLoading={isSubmitting}
                disabled={!canSubmit}
              >
                Create Project
              </LoadingButton>
            )}
          </projectForm.Subscribe>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
