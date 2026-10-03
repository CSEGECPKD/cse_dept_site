"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/components/uploadthing";
import { useMutation } from '@tanstack/react-query';
import { createBlog } from "@/actions/blog.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const blogFormSchema = z.object({
  name: z.string().min(1, { message: "Blog name is required" }),
  authorName: z.string().min(1, { message: "Author name is required" }),
  type: z.string().min(1, { message: "Blog type is required" }),
  authorPosition: z.string().min(1, { message: "Author position is required" }),
  authorImage: z.string().min(1, { message: "Author image is required" }),
  authorLinkedin: z.string().url({ message: "Invalid LinkedIn URL" }),
});

const BlogForm = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      authorImage: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createBlog(data)
    },
    onSuccess: () => {
      router.refresh();
      reset();
    },
    onError: (error) => {
      toast({
        description: `Cannot create ${error.message}`
      })
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  console.log(errors);

  const authorImage = watch("authorImage");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Blog Name"
        type="text"
        placeholder="eg. The Future of AI"
        name="name"
        {...register("name")}
        error={errors?.name}
      />
      <Input
        label="Author Name"
        type="text"
        placeholder="eg. John Doe"
        name="authorName"
        {...register("authorName")}
        error={errors?.authorName}
      />
      <Input
        label="Blog Type"
        type="text"
        placeholder="eg. Technology"
        name="type"
        {...register("type")}
        error={errors?.type}
      />
      <Input
        label="Author Position"
        type="text"
        placeholder="eg. Senior Data Scientist"
        name="authorPosition"
        {...register("authorPosition")}
        error={errors?.authorPosition}
      />
      <Input
        label="Author LinkedIn"
        type="url"
        placeholder="eg. https://www.linkedin.com/in/johndoe"
        name="authorLinkedin"
        {...register("authorLinkedin")}
        error={errors?.authorLinkedin}
      />
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Author Image(JPEG/JPG)</h3>
        {authorImage === "" ? (
          <>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setValue("authorImage", res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            {errors?.authorImage && (
              <p className="text-red-500">{errors.authorImage.message}</p>
            )}
          </>
        ) : (
          <img
            className="w-[200px] border-2 border-black"
            src={authorImage}
            alt="Author"
          />
        )}
      </div>
      <SubmitButton label="Save Blog" type="submit" />
    </form>
  );
};

export default BlogForm;
