"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/components/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { createFaculty } from "@/actions/faculty.action";
import { createPoster } from "@/actions/poster.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const posterFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const PosterForm = () => {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(posterFormSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createPoster(data);
    },
    onSuccess: () => {
      router.refresh();
      reset();
    },
    onError: (error) => {
      toast({
        description: `Cannot create ${error.message}`,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  console.log(errors);

  const imageUrl = watch("imageUrl");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="Enter poster name"
        name="name"
        {...register("name")}
        error={errors?.name}
      />
      <Input
        label="Description"
        type="text"
        placeholder="Enter poster description"
        name="description"
        {...register("description")}
        error={errors?.description}
      />
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Image(JPEG/JPG)</h3>
        {imageUrl === "" ? (
          <>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setValue("imageUrl", res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
            {errors?.imageUrl && (
              <p className="text-red-500">{errors.imageUrl.message}</p>
            )}
          </>
        ) : (
          <img
            className="w-[200px] border-2 border-black"
            src={imageUrl}
            alt=""
          />
        )}
      </div>
      <SubmitButton disabled={mutation.isPending} label="save" type="submit" />
    </form>
  );
};

export default PosterForm;
