import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { POSTS } from '../../../utils/db/dummy.js';
import Post from './Post';
import Comment from './Comment.jsx';
import Reply from './Reply.jsx';

import { IoArrowBackCircleOutline } from "react-icons/io5";

const SelectedPost = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const post = POSTS.find( (post) => post._id == postId );
  return (
    <div className="flex flex-col w-full pt-4">
        <button className="cursor-pointer mb-2" onClick={ () => navigate( -1 ) }>
            <IoArrowBackCircleOutline className="ml-3 size-10 hover:bg-primary rounded-full"/>
        </button>
        <Post post={ post }/>
        <div className="w-full">
            <Reply post={ post }/>
            {
                post.comments.map(
                    ( comment ) => (
                        <Comment comment={ comment } key={ comment._id }/>
                    )
                )
            }
        </div>
    </div>
  )
}

export default SelectedPost;