import React from 'react';

import Post from './Post.jsx';
import PostSkeleton from "../../../components/skeletons/PostSkeleton.jsx"
import { POSTS } from '../../../utils/db/dummy.js';

const Posts = () => {
  const isLoading = false;

  return (
    <>
    {
      isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>        
      )
    }

    {
      ( !isLoading && POSTS.length === 0 ) && <p className="my-4 text-center text-xl">No posts to display 😭</p>
    }
    
    {
      ( !isLoading && POSTS.length > 0 ) && (
        <div>
          {
            POSTS.map( ( post ) => (
              <Post key={ post._id } post={ post }/>
            ) )
          }
        </div>
      )
    }
    
    </>
  )
}

export default Posts