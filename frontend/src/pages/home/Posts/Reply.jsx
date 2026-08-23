
import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";

const Reply = ( { post } ) => {
    const[ comment, setComment ] = useState( "" );

  return (
            <form className="flex flex-col gap-y-3 border-b border-gray-600 p-4">
                <p className="ml-17">{ `Replying to @${ post.user.username }` }</p>
                <div className="flex items-start gap-x-5">
                    <div className="size-10 rounded-full">
                        <img src="/avatars/boy1.png" alt="Profile picture" />
                    </div>
                    <textarea value={ comment } onChange={ ( e ) => setComment( e.target.value ) } className="w-full textarea textarea-ghost resize-none bg-none focus:outline-none" placeholder="Post your reply" />
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
  )
}

export default Reply;


