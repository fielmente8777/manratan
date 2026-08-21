"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "./blogsData";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="block group cursor-pointer h-full">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
        {/* Card Cover Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={post.coverImage}
            alt={post.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Card Content Body */}
        <div className="p-5 flex flex-col flex-grow justify-between bg-white text-left">
          <div>
            {/* Title */}
            <h3 className="text-primary text-lg sm:text-xl md:text-[1.25rem] font-[serif] font-normal uppercase leading-[1.3] tracking-[0.05em] group-hover:text-secondary transition-colors">
              {post.title}
            </h3>

            {/* Date */}
            <p className="text-secondary/75 text-xs sm:text-sm font-normal my-2.5">
              {post.date}
            </p>

            {/* Excerpt Body with Read More */}
            <p className="text-secondary text-xs sm:text-sm leading-relaxed font-normal">
              {post.description}...
              <span className="text-primary font-bold group-hover:underline inline-block ml-1">
                Read More
              </span>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
