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

export function WorkspaceSettingsInfo() {
  const workspaceForm = useForm({
    defaultValues: {
      name: "My Workspace",
      slug: "my-workspace",
      description: "",
    },
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .min(3, "Name must be at least 3 characters")
          .max(50, "Name must be at most 50 characters"),
        slug: z
          .string()
          .min(3, "Slug must be at least 3 characters")
          .max(30, "Slug must be at most 30 characters")
          .regex(
            /^[a-z0-9-]+$/,
            "Slug can only contain lowercase letters, numbers, and hyphens"
          ),
        description: z
          .string()
          .max(200, "Description must be at most 200 characters"),
      }),
    },
    onSubmit: async ({ value }) => {
      // TODO: Implement workspace update API
      console.log("Updating workspace:", value);
      toast.success("Workspace settings updated successfully");
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
      <Field className="md:flex-1/3">
        <FieldLabel>Workspace Information</FieldLabel>
        <FieldDescription>
          Update your workspace name, URL slug, and description. These details
          help identify your workspace across the platform.
        </FieldDescription>
      </Field>
      <Card className="md:flex-2/3">
        <CardContent>
          <FieldGroup>
            <workspaceForm.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="name">Workspace Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Enter workspace name"
                    className="max-w-sm"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                  <FieldDescription>
                    This is the display name of your workspace.
                  </FieldDescription>
                </Field>
              )}
            </workspaceForm.Field>
            <workspaceForm.Field name="slug">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="slug">Workspace URL</FieldLabel>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      usetwenty.com/
                    </span>
                    <Input
                      id="slug"
                      placeholder="my-workspace"
                      className="max-w-xs"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value.toLowerCase())
                      }
                      onBlur={field.handleBlur}
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                  <FieldDescription>
                    The URL slug for your workspace. Use lowercase letters,
                    numbers, and hyphens only.
                  </FieldDescription>
                </Field>
              )}
            </workspaceForm.Field>
            <workspaceForm.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter a brief description of your workspace"
                    className="max-w-sm resize-none"
                    rows={3}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                  <FieldError errors={field.state.meta.errors} />
                  <FieldDescription>
                    A brief description of what this workspace is for.
                  </FieldDescription>
                </Field>
              )}
            </workspaceForm.Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <workspaceForm.Subscribe
            selector={(state) => [state.isSubmitting, state.canSubmit]}
          >
            {([isSubmitting, canSubmit]) => (
              <LoadingButton
                type="button"
                className="ml-auto"
                onClick={() => workspaceForm.handleSubmit()}
                isLoading={isSubmitting}
                disabled={!canSubmit}
              >
                Save Changes
              </LoadingButton>
            )}
          </workspaceForm.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}
