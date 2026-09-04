import React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CreatePost from "./CreatePost";
import Posts from "./Posts/Posts";
import { postsQueryFn } from '../../utils/db/queries.js';

const HomeFeed = () => {
  const [feedType, setFeedType] = useState("all");

  const{ data:posts, isPending } = useQuery( {
    queryKey: [ "posts", feedType ],
    queryFn: () => postsQueryFn( feedType ),
  } );

  return (
    <>
      <div className="flex w-full border-b border-b-gray-600">
        <button
          className="flex flex-1 justify-center items-center p-3 cursor-pointer relative hover:bg-secondary transition-all"
          onClick={() => setFeedType("all")}
        >
          For you
          {feedType === "all" && (
            <div className="absolute bottom-0 w-10 h-1 bg-primary" />
          )}
        </button>
        <button
          className="flex flex-1 justify-center items-center p-3 cursor-pointer relative hover:bg-secondary transition-all"
          onClick={() => setFeedType("following")}
        >
          Following
          {feedType === "following" && (
            <div className="absolute bottom-0 w-10 h-1 bg-primary" />
          )}
        </button>
      </div>
      <CreatePost />
      <Posts posts={ posts } isPending={ isPending }/>
    </>
  );
}

export default HomeFeed