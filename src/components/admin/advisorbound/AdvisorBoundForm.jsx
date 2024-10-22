"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/components/uploadthing";
import { useMutation } from '@tanstack/react-query';
import { createFaculty } from "@/actions/faculty.action";
import { createAdvisoryBoardMember } from "@/actions/advisoryboard.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const advisorBoundFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  designation: z.string().min(1, { message: "Designation is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

const AdvisorBoundForm = () => {
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
    resolver: zodResolver(advisorBoundFormSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createAdvisoryBoardMember(data)
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

  const imageUrl = watch("imageUrl");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="eg. John Doe"
        name="name"
        {...register("name")}
        error={errors?.name}
      />
      <Input
        label="Designation"
        type="text"
        placeholder="eg. Professor"
        name="designation"
        {...register("designation")}
        error={errors?.designation}
      />
      <Input
        label="Position"
        type="text"
        placeholder="eg. Advisory Board Member"
        name="position"
        {...register("position")}
        error={errors?.position}
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
                setValue("imageUrl", res[0].url);
              }}
              onUploadError={(error) => {
                // Do something with the error.
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
      <SubmitButton label="save" type="submit" />
    </form>
  );
};

export default AdvisorBoundForm;
