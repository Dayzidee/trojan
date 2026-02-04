// @ts-nocheck
import React from 'react';
import BlogGrid from '../components/blog/BlogGrid';
import FAQ from '../components/home/FAQ';
import CallToAction from '../components/home/CallToAction';

const Blog = () => {
    return (
        <div className="bg-black text-white min-h-screen pt-20">
            <BlogGrid />
            <FAQ />
            <CallToAction />
        </div>
    );
};

export default Blog;
