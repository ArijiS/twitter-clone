import React from 'react';
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { authUserQueryFn, deletePostFn } from '../../../utils/db/queries.js';

import CommentModal from '../../../components/modals/CommentModal';

import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";

const Post = ( { post } ) => {

  const queryClient = useQueryClient();

  const { data:authUser } = useQuery( {
    queryKey: [ "authUser" ],
    queryFn: authUserQueryFn,
    retry: false, 
  } );

  const { mutate:deletePost, isPending,  } = useMutation( {
    mutationFn: deletePostFn,
    onSuccess: () => queryClient.invalidateQueries( { queryKey: [ "posts" ] } )
  } );

  const isLoggedInUser = authUser._id === post.user._id;

  const modalRef = useRef( null );

  return (
    <div className="flex gap-x-3 w-full items-start border-b-2 border-gray-600 p-3">

      <div>
        <div className="size-10 rounded-full overflow-hidden">
          <Link to={ `/profile/${post.user.username}` }>
            <img alt="Tailwind-CSS-Avatar-component" src={ post.user.profileImg || "/avatar-placeholder.png" } className="object-cover"/>
          </Link>          
        </div>
      </div>

      <div className="flex flex-col flex-1">

        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
              <p className="font-bold">{ post.user.fullname }</p>
              <p className="font-light">{ `@${post.user.username}` }</p>
              <p className="font-light">{ "• " + new Date( post.createdAt ).toLocaleDateString() }</p>
          </div>
          { 
            isLoggedInUser && (
              <button className="btn btn-circle hover:btn-error" disabled={ isPending }
                onClick={ () => deletePost( post ) }
              >
                { isPending ? ( <span className="loading loading-spinner loading-sm"></span> ) : ( <AiFillDelete className="size-4 text-white"/> ) }
              </button>
            )
          }
          
        </div>

        <div className="flex flex-col gap-y-4">
          { post.text && (
            <Link to={ `/post/${post._id}` }>
            <p>{ post.text }</p> 
          </Link>
          )         
          }
          { post.img && 
          <div className="w-full rounded-xl overflow-hidden">
            <img src={ post.img } alt="Post" className="w-full h-auto object-cover"/>
          </div>}
          
        </div>

        <div className="flex justify-between items-center pt-3">
           <button className="flex items-center gap-x-2 group hover:bg-primary/20 rounded-full p-3 cursor-pointer" onClick={ () => modalRef.current.showModal() }>
              <FaRegComment className="size-5 group-hover:text-primary"/>
              <span className="group-hover:text-primary">{post.comments.length}</span>
           </button>
           <button className="flex items-center gap-x-2 group hover:bg-green-400/20 rounded-full p-3 cursor-pointer">
              <BiRepost className="size-6 group-hover:text-green-400"/>
              <span className="group-hover:text-green-400">0</span>
           </button>
           <button className="flex items-center gap-x-2 group hover:bg-pink-600/20 rounded-full p-3 cursor-pointer">
              <FaRegHeart className="size-5 group-hover:text-pink-600"/>
              <span className="group-hover:text-pink-600">{ post.likes.length }</span>
           </button>
           <button className="flex items-center gap-x-2 group group hover:bg-primary/20 rounded-full p-3 cursor-pointer">
              <FaRegBookmark className="size-5 group-hover:text-primary"/>
           </button>
        </div>

      </div>

            <CommentModal ref={ modalRef } post={ post }/>

    </div>
  )
}

export default Post;