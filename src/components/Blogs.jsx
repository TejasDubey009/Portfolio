import React from 'react';
import { blogSection } from '../portfolio';
import { BookOpen, ArrowUpRight } from 'lucide-react';

export const Blogs = () => {
  if (!blogSection.display) {
    return null;
  }

  return (
    <section className="main" id="blogs">
      <div className="blog-header">
        <h1 className="blog-heading">{blogSection.title}</h1>
        <p className="subTitle blog-subtitle">{blogSection.subtitle}</p>
      </div>

      <div className="blog-main-div">
        {blogSection.blogs.map((blog, index) => {
          return (
            <a
              key={index}
              className="blog-card"
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="blog-card-header">
                <BookOpen size={28} className="blog-icon" />
                <ArrowUpRight size={20} className="blog-arrow" />
              </div>
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};
