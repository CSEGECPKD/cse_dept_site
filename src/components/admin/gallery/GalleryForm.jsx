"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/components/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { createGallery } from "@/actions/gallery.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const galleryFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  imgDescription: z
    .string()
    .min(1, { message: "Image Description is required" }),
});

const GalleryForm = () => {
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
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      image: "",
      imgDescription: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createGallery(data);
    },
    onSuccess: () => {
      reset();
      router.refresh();
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

  const imageUrl = watch("image");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="eg. Gallery Name"
        name="name"
        {...register("name")}
        error={errors?.name}
      />
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Image(JPEG/JPG)</h3>
        {imageUrl === "" ? (
          <>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setValue("image", res[0].url);
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            {errors?.image && (
              <p className="text-red-500">{errors.image.message}</p>
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
      <Input
        label="Image Description"
        type="text"
        placeholder="eg. Description of the gallery"
        name="imgDescription"
        {...register("imgDescription")}
        error={errors?.imgDescription}
      />
      <SubmitButton disabled={mutation.isPending} label="save" type="submit" />
    </form>
  );
};

export default GalleryForm;
