import React from 'react';

import { FaLink } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

const ProfilePageHeaderDetails = ( { user } ) => {
  return (
    <div className="flex flex-col px-5 mt-10 gap-y-5 mb-5">
        <div className="flex flex-col gap-y-1">
            <p className="text-xl font-bold">{ user.fullName }</p>
            <p className="text-gray-500">{ `@${user.username}` }</p>
            <p>{ user.bio }</p>
        </div>
        {
            user.link && (
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-x-2">
                        <FaLink /> <a href={ user.link }
                        target="_blank" rel="noreferrer"
                        className="text-primary hover:underline hover:underline-offset-4"
                        >youtube.com/@asaprogrammer_</a>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <IoCalendarOutline/><p>Joined July 2021</p>
                    </div>
                </div>
            )
        }
        <div className="flex flex-wrap gap-2">
            <p>{ `${user.following.length} following` }</p>
            <p>{ `${user.followers.length} followers` }</p>
        </div>
    </div>
  )
}

export default ProfilePageHeaderDetails;