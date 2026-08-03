"use client";

import React from "react";
import SubmitButton from "@/components/admin/SubmitButton";
import Input from "@/components/admin/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createStudent } from "@/actions/student.action";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const studentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  course: z.string().min(1, { message: "Course is required" }),
  batch: z.string().regex(/^\d{4}-\d{4}$/, {
    message: "Invalid batch format",
  }),
});

const StudentForm = ({ courses }) => {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentFormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      await createStudent(data);
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
    mutate(data);
  };

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
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        label="Batch"
        type="text"
        placeholder="eg. 2020-2024"
        name="batch"
        {...register("batch")}
        error={errors?.batch}
      />
      <SubmitButton disabled={isPending} label="save" type="submit" />
    </form>
  );
};

export default StudentForm;
