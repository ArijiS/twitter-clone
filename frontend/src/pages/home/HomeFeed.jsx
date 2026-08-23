import React from 'react';
import { useState } from 'react';

import CreatePost from "./CreatePost";
import Posts from "./Posts/Posts";

const HomeFeed = () => {
    const [ feedType, setFeedType ] = useState( "forYou" );
    
  return (
    <>
        <div className="flex w-full border-b border-b-gray-600">
            <button className="flex flex-1 justify-center items-center p-3 cursor-pointer relative hover:bg-secondary transition-all"
            onClick={ ()=> setFeedType( "forYou" ) }
            >For you
            {feedType === "forYou" && <div className="absolute bottom-0 w-10 h-1 bg-primary"/>}
            </button>
            <button className="flex flex-1 justify-center items-center p-3 cursor-pointer relative hover:bg-secondary transition-all"
            onClick={ ()=> setFeedType( "following" ) }
            >Following
            {feedType === "following" && <div className="absolute bottom-0 w-10 h-1 bg-primary"/>}
            </button>
      </div>
      <CreatePost />
      <Posts />
    </>
  )
}

export default HomeFeed