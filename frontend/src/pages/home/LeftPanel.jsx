import React from 'react';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

import { authUserQueryFn } from '../../utils/db/queries.js';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import XSvg from "../../components/svgs/XSvg";
import { HiHome } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";


const LeftPanel = () => {
  const loading = false;
  /* const data = {
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy1.png",
	}; */

  const queryClient = useQueryClient();
  const { data:authUser } = useQuery( {
    queryKey: [ "authUser" ],
    queryFn: authUserQueryFn,
    retry: false,
  } );

  const{ mutate } = useMutation( {
    mutationFn: async () => {
      try{
        const res = await fetch( "/api/auth/logout", {
          method: "POST"
        } );
        const data = await res.json();
        if( !res.ok ){
          throw new Error( data.error );
        };
        if( data.error ){
          throw new Error( data.error );
        }
      }
      catch( error ){
        toast.error( error.message );
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.setQueryData( ["authUser"], null );
    },
    onError: () => {
      toast.error( "Problem logging out" );
    },
    
  } );
  return (
    <div className="max-md:hidden md:flex-[2_2_0] w-16 h-screen">
      <div className="flex flex-col justify-between w-full h-full p-3">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <span className="loading loading-spinner loading-xl text-primary"></span>
          </div>
        ) : (
          <ul className="flex flex-col gap-y-6">
            <li className="mb-10">
              <Link to="/">
                <XSvg className="size-20 p-3 fill-white hover:bg-stone-900 rounded-full" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 hover:bg-stone-900 rounded-full transition-all"
              >
                <HiHome className="size-8" />
                <span className="text-xl">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/notifications"
                className="flex items-center gap-3 p-3 hover:bg-stone-900 rounded-full transition-all"
              >
                <IoNotifications className="size-8" />
                <span className="text-xl">Notifications</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/profile/${authUser?.username}`}
                className="flex items-center gap-3 p-3 hover:bg-stone-900 rounded-full transition-all"
              >
                <FaUser className="size-8" />
                <span className="text-xl">Profile</span>
              </Link>
            </li>
          </ul>
        )}

        <div>
          {authUser && (
            <div className="flex items-center gap-x-4">
              <Link
                to={`/profile/${authUser?.username}`}
                className="flex gap-x-3 w-full hover:bg-stone-900 rounded-full p-3"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src={authUser?.profileImg || "/avatar-placeholder.png"}
                      alt="profile picture"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold">{authUser?.fullname}</p>
                  <p className="text-sm font-light">{`@${authUser?.username}`}</p>
                </div>
              </Link>
              <button className="btn btn-circle btn-sm btn-error"
                onClick={ () => mutate() }
              >
                <RiLogoutCircleLine className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;