import React from 'react';
import { Link } from "react-router-dom";
//import { USERS_FOR_RIGHT_PANEL } from '../../utils/db/dummy.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import { useQuery } from '@tanstack/react-query';
import { getSuggestedUsersFn, authUserQueryFn } from "../../utils/db/queries.js";
import useFollowUnfollow from '../../hooks/useFollowUnfollow.jsx';

import RightPanelSkeleton from "../../components/skeletons/RightPanelSkeleton.jsx";


const RightPanel = () => {
  const{ data:suggestedUsers, isLoading } = useQuery( {
    queryKey: [ "suggestedUsers" ],
    queryFn: getSuggestedUsersFn,
  } );

  const { data:authUser } = useQuery( {
    queryKey: [ "authUser" ],
    queryFn: authUserQueryFn
  } );
  
  const{ followUser, isPending } = useFollowUnfollow();

  return (
    <div className="max-md:hidden flex-[2_2_0] h-screen p-5">
      <div className="border border-gray-600 p-3 rounded-2xl">
        <p className="text-xl font-bold mb-4">Who to follow</p>
        { isLoading ?

        <div className="flex flex-col gap-y-4">
          <RightPanelSkeleton />
          <RightPanelSkeleton />
          <RightPanelSkeleton />
          <RightPanelSkeleton />
        </div> :

        <div className="flex flex-col gap-y-3">
          { 
            suggestedUsers.length === 0 ?
            <div classname="w-full p-3 text-center">
              <p className="text-lg font-medium">No users to suggest</p>
            </div>:


            suggestedUsers.map( user => (
              <Link to={ `/profile/${ user?.username }` } key={ user._id }
              className="hover:bg-stone-900 p-3 rounded-full"
              >
                <div className="flex w-full items-center gap-x-4">
                <div className="avatar">
                  <div className="size-12 rounded-full">
                    <img alt="Tailwind-CSS-Avatar-component" src={ user?.profileImg || "/avatar-placeholder.png" } />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-medium">{ user?.fullName }</p>
                  <p className="text-sm font-light">{ `@${user?.username}` }</p>
                </div>
                <button className="btn bg-white hover:bg-primary text-secondary rounded-full ml-auto py-5 px-7"
                onClick={ 
                  ( e )=> { 
                    e.preventDefault();
                    followUser( user._id );
                  } }
                >
                  {isPending && (
                    <LoadingSpinner size="sm"/>
                  )}
                  {
                  authUser.following.includes( user._id ) ?
                  "Unfollow" :
                  "Follow"
                }</button>
              </div>
              </Link>
            ) )
          }
        </div>
        }
        
      </div>
      
    </div>
  )
}

export default RightPanel;