
import { getBlogs } from "@/actions/blog.action";
import BlogForm from "@/components/admin/blog/BlogForm";
import BlogList from "@/components/admin/blog/BlogList";
import React from "react";

const EditAccreditionPage = async () => {
  const blogs = await getBlogs();
  return (
    <div className="grid grid-cols-2">
      <div className="py-20 px-20">
        <BlogForm />
      </div>
      <div className="py-20 px-10">
        <BlogList blogList={blogs} />
      </div>
    </div>
  );
};

export default EditAccreditionPage;
