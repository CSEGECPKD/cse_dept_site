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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const facultyFormSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  yearOfJoin: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "Year of Join must be an integer",
    })
    .refine((val) => val.length === 4, {
      message: "Year of Join must be 4 digits year",
    }),
  yearOfDept: z
    .string()
    .refine((val) => /^\d+$/.test(val), {
      message: "Year of Department must be an integer",
    })
    .refine((val) => val.length === 4, {
      message: "Year of Department must be 4 digits year",
    }),
  designation: z.string().min(1, { message: "Designation is required" }),
  emailId: z.string().email({ message: "Invalid email" }),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

const FacultyForm = () => {
  const router = useRouter();
  toast;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(facultyFormSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createFaculty(data);
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

  const imageUrl = watch("imageUrl");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Type"
        type="text"
        placeholder="eg. Professor"
        name="type"
        {...register("type")}
        error={errors?.type}
      />
      <Input
        label="Name"
        type="text"
        placeholder="eg. John Doe"
        name="name"
        {...register("name")}
        error={errors?.name}
      />
      <Input
        label="Year of Join"
        type="text"
        placeholder="eg. 2010"
        name="yearOfJoin"
        {...register("yearOfJoin")}
        error={errors?.yearOfJoin}
      />
      <Input
        label="Year of Department"
        type="text"
        placeholder="eg. 2015"
        name="yearOfDept"
        {...register("yearOfDept")}
        error={errors?.yearOfDept}
      />
      <Input
        label="Designation"
        type="text"
        placeholder="eg. Head of Department"
        name="designation"
        {...register("designation")}
        error={errors?.designation}
      />
      <Input
        label="Email ID"
        type="email"
        placeholder="eg. john.doe@example.com"
        name="emailId"
        {...register("emailId")}
        error={errors?.emailId}
      />
      <Input
        label="Qualification"
        type="text"
        placeholder="eg. Ph.D. in Computer Science"
        name="qualification"
        {...register("qualification")}
        error={errors?.qualification}
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

export default FacultyForm;
