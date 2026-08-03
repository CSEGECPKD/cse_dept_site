"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@/components/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/actions/event.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const eventFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  date: z.date({ required_error: "Date is required" }),
  details: z.string().min(1, { message: "Details are required" }),
  mode: z.string().min(1, { message: "Mode is required" }),
  posters: z
    .array(z.string())
    .min(1, { message: "At least one poster is required" }),
  regLinks: z
    .array(z.string())
    .min(1, { message: "At least one registration link is required" }),
});

const EventForm = () => {
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
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      posters: [],
      regLinks: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      await createEvent(data);
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

  const posters = watch("posters");
  const regLinks = watch("regLinks");

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        type="text"
        placeholder="eg. Annual Tech Conference"
        name="name"
        {...register("name")}
        error={errors?.name}
      />
      <Input
        label="Date"
        type="date"
        name="date"
        {...register("date", { valueAsDate: true })}
        error={errors?.date}
      />
      <div className="space-y-2">
        <label className="font-medium capitalize text-2xl">Mode</label>
        <select
          {...register("mode")}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select mode</option>
          <option value="Offline">Offline</option>
          <option value="Online">Online</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors?.mode && <p className="text-red-500">{errors.mode.message}</p>}
      </div>
      <Input
        label="Details"
        type="textarea"
        placeholder="Enter event details..."
        name="details"
        {...register("details")}
        error={errors?.details}
      />
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Posters</h3>
        {posters.map((poster, index) => (
          <img
            key={index}
            className="w-[200px] border-2 border-black"
            src={poster}
            alt={`Poster ${index + 1}`}
          />
        ))}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setValue("posters", [...posters, res[0].url]);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        {errors?.posters && (
          <p className="text-red-500">{errors.posters.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="font-medium capitalize text-2xl">Registration Links</h3>
        {regLinks.map((link, index) => (
          <Input
            key={index}
            label={`Link ${index + 1}`}
            type="url"
            value={link}
            onChange={(e) => {
              const newLinks = [...regLinks];
              newLinks[index] = e.target.value;
              setValue("regLinks", newLinks);
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => setValue("regLinks", [...regLinks, ""])}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Registration Link
        </button>
        {errors?.regLinks && (
          <p className="text-red-500">{errors.regLinks.message}</p>
        )}
      </div>
      <SubmitButton
        disabled={mutation.isPending}
        label="Save Event"
        type="submit"
      />
    </form>
  );
};

export default EventForm;
