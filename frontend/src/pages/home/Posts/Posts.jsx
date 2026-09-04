import React from 'react';

import Post from './Post.jsx';
import PostSkeleton from "../../../components/skeletons/PostSkeleton.jsx"
//import { POSTS } from '../../../utils/db/dummy.js';

const Posts = ( { posts, isPending } ) => {
  const isLoading = false;

  return (
    <>
    {
      isPending && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>        
      )
    }

    {
      ( !isPending && posts.length === 0 ) && <p className="my-4 text-center text-xl">No posts to display 😭</p>
    }
    
    {
      ( !isPending && posts.length > 0 ) && (
        <div>
          {
            posts.map( ( post ) => (
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