import React from 'react';
import Image from 'next/image';
import { IoPersonCircle } from 'react-icons/io5';
import { notFound } from 'next/navigation';
import { getBlogById } from '@/actions/blog.action';
import { data as staticBlogs } from '../content';

export default async function DetailsPage({ params }) {
    const { id } = await params;

    // 1. Attempt to fetch from MongoDB by ObjectId
    let blogItem = await getBlogById(id);

    // 2. Fallback to static mock blogs if not found by ObjectId (e.g. legacy numeric id)
    if (!blogItem) {
        const found = staticBlogs.find((item) => String(item.id) === String(id));
        if (found) {
            blogItem = {
                name: found.head,
                authorName: found.name,
                authorPosition: found.year,
                authorImage: found.img,
                content: found.content,
                details: found.details,
                date: found.date,
            };
        }
    }

    if (!blogItem) {
        notFound();
    }

    const title = blogItem.name || blogItem.head || 'Blog Post';
    const author = blogItem.authorName || blogItem.name || 'Anonymous';
    const position = blogItem.authorPosition || blogItem.year || '';
    const image = blogItem.authorImage || blogItem.img || '/blog.jpg';
    const dateStr =
        blogItem.date ||
        (blogItem.createdAt
            ? new Date(blogItem.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              })
            : '');
    const bodyContent = blogItem.content || blogItem.details || '';

    return (
        <div>
            <div className="bg-[#e9e8e9] pb-5">
                <div className="container mx-auto w-full h-[200px] flex justify-center items-end">
                    <span className="w-3 h-3 bg-black mb-5 mr-3"></span>
                    <h1 className="uppercase text-[28px] md:text-[35px] font-bold text-center px-4">
                        {title}
                    </h1>
                </div>
                {dateStr && (
                    <h3 className="uppercase text-gray-500 text-center font-bold text-lg md:text-2xl mt-2">
                        {dateStr}
                    </h3>
                )}
            </div>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                <div className="relative w-full h-[250px] md:h-[400px] lg:h-[520px] flex justify-center">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="rounded-md object-cover"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
                    <div className="w-full md:w-72 flex flex-col items-center text-center">
                        <IoPersonCircle className="w-16 h-16 md:w-12 md:h-12 text-gray-600" />
                        <h2 className="text-lg md:text-xl font-semibold mt-2">{author}</h2>
                        {position && <p className="text-gray-600">{position}</p>}
                        {blogItem.authorLinkedin && (
                            <a
                                href={blogItem.authorLinkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline mt-2"
                            >
                                LinkedIn Profile
                            </a>
                        )}
                    </div>
                    <div className="col-span-2 text-justify text-gray-700 whitespace-pre-line leading-relaxed">
                        <p>{bodyContent}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
