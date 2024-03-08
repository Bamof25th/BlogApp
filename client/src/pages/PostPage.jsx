// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";

const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(false);
  const [post, setPost] = useState(false);
  const { postSlug } = useParams();

  useEffect(() => {
    // Get the post data here.
    const fetchPost = async () => {
      try {
        setLoading(true);
        let res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(errors)
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen ">
      <h1 className="text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.catagory}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.catagory}
        </Button>
      </Link>
      <img
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
        src={post && post.image}
        alt={post && post.title}
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
        <span>{post && new Date(post.updatedAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} minuts read
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className="p-3 max-w-2xl mx-auto w-full post-content"
      />
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
};

export default PostPage;
