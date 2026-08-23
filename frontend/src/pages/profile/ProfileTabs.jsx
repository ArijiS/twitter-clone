import React from 'react';
import { useState } from 'react';

const ProfileTabs = () => {
    const [ selectedTab, setSelectedTab ] = useState( "posts" );
  return (
    <div className="flex w-full border-b border-gray-600">
        <div className="relative w-full flex items-center justify-center py-5 hover:bg-secondary cursor-pointer"
            onClick={ () => setSelectedTab( "posts" ) }
        >
            <p className="text-center">Posts</p>
            { selectedTab === "posts" && ( <div className="absolute bottom-0 w-10 h-1 bg-primary"/> ) }
        </div>
        <div className="relative w-full py-5 flex items-center justify-center hover:bg-secondary cursor-pointer"
            onClick={ () => setSelectedTab( "following" ) }
        >
            <p className="text-center">Likes</p>
            { selectedTab === "following" && ( <div className="absolute bottom-0 w-10 h-1 bg-primary"/> ) }
        </div>
    </div>
  )
}

export default ProfileTabs;