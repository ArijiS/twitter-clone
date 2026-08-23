import React from 'react';
import { Link } from "react-router-dom";

import XSvg from "../../components/svgs/XSvg";
import { HiHome } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";


const LeftPanel = () => {
  const loading = false;
  const data = {
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy1.png",
	};
  return (
    <div className="max-md:hidden md:flex-[2_2_0] w-16 h-screen">
        
      <div className="flex flex-col justify-between w-full h-full p-3">
          { 
           loading ?
           
           <div className="h-full w-full flex items-center justify-center">
            <span className="loading loading-spinner loading-xl text-primary"></span>
           </div> :

            (<ul className="flex flex-col gap-y-6">
            <li className="mb-10">
              <Link to='/'>
                <XSvg className="size-20 p-3 fill-white hover:bg-stone-900 rounded-full"/>
              </Link>
            </li>
            <li>
              <Link to='/' className="flex items-center gap-3 p-3 hover:bg-stone-900 rounded-full transition-all">
                <HiHome className="size-8"/>
                <span className="text-xl">Home</span>
              </Link>
            </li>
            <li>
              <Link to='/notifications' className="flex items-center gap-3 p-3 hover:bg-stone-900 rounded-full transition-all">
                <IoNotifications className="size-8"/>
                <span className="text-xl">Notifications</span>
              </Link>
            </li>
            <li>
              <Link to={`/profile/${data?.username}`} className="flex items-center gap-3 p-3 hover:bg-stone-900 rounded-full transition-all">
                <FaUser className="size-8"/>
                <span className="text-xl">Profile</span>
              </Link>
            </li>
          </ul>)            
          }
          
        
          <div>
            { data && (
                <Link to={`/profile/${data?.username}`}
                className="flex gap-x-3 w-full hover:bg-stone-900 rounded-full p-3">
                  <div className="avatar">
                    <div className="w-12">
                      <img src={ data?.profileImg || "/avatar-placeholder.png" } alt="profile picture" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{ data?.fullName }</p>
                    <p className="text-sm font-light">{ `@${ data?.username }` }</p>
                  </div>
                </Link>
            ) }
            
          </div>
      </div>
    </div>
  )
}

export default LeftPanel;