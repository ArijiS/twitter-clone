import React from 'react';
import { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { FaImage } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const CommentModal = forwardRef( ( { post}, ref ) => {

    const[ comment, setComment ] = useState( "" );

  return (
    <dialog className="modal" ref={ ref }>
        <div className="relative modal-box bg-gray-900 rounded-xl">
            <div className="flex flex-col gap-y-5">
                {/** TOP PART */}
                <form method="dialog" className="flex bg-amber-200 items-center mb-3">
                    <button className="absolute top-2 left-2 cursor-pointer hover:text-primary"> <IoMdCloseCircle className="size-6"/> </button>
                </form>
                
                <div className="flex gap-x-5 min-h-20">
                    <div className="flex flex-col gap-y-0.5 items-center">
                        <Link to={ `/profile/${post.user.username}` } >
                            <div className="size-10 rounded-full overflow-hidden">                                
                                <img alt="Tailwind-CSS-Avatar-component" src={ post.user.profileImg || "/avatar-placeholder.png" } 
                                        className="object-cover"/>                                        
                            </div>
                        </Link>
                        <div className="w-0.5 h-full bg-gray-600"/> { /** THIS LINE */}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="flex gap-x-2 items-center">
                            <p className="font-bold">{ post.user.fullname }</p>
                            <p className="font-light">{ `@${post.user.username}` }</p>
                            <p className="font-light">{"• " + new Date( post.createdAt ).toLocaleDateString() }</p>
                        </div>
                        <p>{ post.text }</p>
                    </div>
                </div>
                {/** TOP PART */}

                {/** BOTTOM PART */}
                <form className="flex flex-col gap-y-5">
                    <div className="flex items-start gap-x-5">
                        <div className="size-10 rounded-full">
                            <img src="/avatars/boy1.png" alt="Profile picture" />
                        </div>
                        <textarea value={ comment } onChange={ ( e ) => setComment( e.target.value ) } className="w-full textarea textarea-ghost resize-none bg-gray-900 focus:outline-none"
                        placeholder="Post your reply" />
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div className="flex gap-x-2">
                            <button type="button" className="cursor-pointer p-2 rounded-full hover:bg-gray-600">
                                <FaImage className="size-4" />
                            </button>
                            <button type="button" className="cursor-pointer p-2 rounded-full hover:bg-gray-600">
                                <BsEmojiSmileFill className="size-4"/>
                            </button>
                        </div>
                        <button className="btn btn-primary rounded-full" type="submit">Reply</button>
                    </div>
                </form>
                {/** BOTTOM PART */}
            </div>
        </div>

        <form method="dialog" className="modal-backdrop">
            <button></button>
        </form>
    </dialog>
  )
} );

export default CommentModal;