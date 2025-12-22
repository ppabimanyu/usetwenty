"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";

type ProjectSettingsInfoProps = {
  projectId: string;
};

export function ProjectSettingsInfo({ projectId }: ProjectSettingsInfoProps) {
  const projectForm = useForm({
    defaultValues: {
      name: `Project ${projectId}`,
      code: `PRJ-${projectId}`,
      description: "A sample project for demonstration purposes",
    },
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .min(3, "Name must be at least 3 characters")
          .max(50, "Name must be at most 50 characters"),
        code: z
          .string()
          .min(2, "Code must be at least 2 characters")
          .max(10, "Code must be at most 10 characters")
          .regex(
            /^[A-Z0-9-]+$/,
            "Code can only contain uppercase letters, numbers, and hyphens"
          ),
        description: z
          .string()
          .max(500, "Description must be at most 500 characters"),
      }),
    },
    onSubmit: async ({ value }) => {
      // TODO: Implement project update API
      console.log("Updating project:", value);
      toast.success("Project settings updated successfully");
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
      <Field className="md:flex-1/3">
        <FieldLabel>Project Information</FieldLabel>
        <FieldDescription>
          Update your project name, code prefix, and description. These details
          help identify your project across the workspace.
        </FieldDescription>
      </Field>
      <Card className="md:flex-2/3">
        <CardContent>
          <FieldGroup>
            <projectForm.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="name">Project Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Enter project name"
                    className="max-w-sm"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                  <FieldDescription>
                    This is the display name of your project.
                  </FieldDescription>
                </Field>
              )}
            </projectForm.Field>
            <projectForm.Field name="code">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="code">Project Code</FieldLabel>
                  <Input
                    id="code"
                    placeholder="PRJ"
                    className="max-w-xs"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value.toUpperCase())
                    }
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                  <FieldDescription>
                    This code prefix will be used for all issues in this project
                    (e.g., PRJ-1, PRJ-2).
                  </FieldDescription>
                </Field>
              )}
            </projectForm.Field>
            <projectForm.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter a description for your project"
                    className="max-w-sm resize-none"
                    rows={3}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                  <FieldDescription>
                    A brief description of what this project is about.
                  </FieldDescription>
                </Field>
              )}
            </projectForm.Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <projectForm.Subscribe
            selector={(state) => [state.isSubmitting, state.canSubmit]}
          >
            {([isSubmitting, canSubmit]) => (
              <LoadingButton
                type="button"
                className="ml-auto"
                onClick={() => projectForm.handleSubmit()}
                isLoading={isSubmitting}
                disabled={!canSubmit}
              >
                Save Changes
              </LoadingButton>
            )}
          </projectForm.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}
