import React, { useEffect } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Note } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

const TitleEditForm = ({
  note,
  setTitleEdit,
}: {
  note: Note | null;
  setTitleEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note?.title || "",
    },
  });

  const { isSubmitting } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/notes/${note?.id}`, values);
      toast.success("Note updated successfully");
      router.refresh();
      form.reset();
      setTitleEdit(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "An error occurred";
        toast.error(errorMessage);
      } else {
        const errorMessage = (error as Error).message || "An error occurred";
        toast.error(errorMessage);
      }
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex items-center"
        >
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for the note"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="ml-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin transition mr-2" />
              )}
              Save
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              disabled={isSubmitting}
              className="ml-2"
              onClick={() => {
                setTitleEdit(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TitleEditForm;
