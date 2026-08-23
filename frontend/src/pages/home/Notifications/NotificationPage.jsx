import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

import LoadingSpinner from "../../../components/LoadingSpinner.jsx";

const NotificationPage = () => {
	const navigate = useNavigate();
	const isLoading = false;
	const notifications = [
			{
				_id: "1",
				from: {
					_id: "1",
					username: "johndoe",
					profileImg: "/avatars/boy2.png",
				},
				type: "follow",
			},
			{
				_id: "2",
				from: {
					_id: "2",
					username: "janedoe",
					profileImg: "/avatars/girl1.png",
				},
				type: "like",
			},
		];

	const deleteNotifications = () => {
		alert("All notifications deleted");
	};

  return (
	<div className="flex flex-col w-full">
		
			<div className="flex justify-between items-center p-4 border-b border-gray-700">
			<div className="flex items-center gap-x-4">
				<button className="cursor-pointer btn btn-circle hover:bg-primary" onClick={ () => navigate( -1 ) }>
					<IoArrowBackCircleOutline className="size-10"/>
				</button>
				<p className="font-bold">Notifications</p>
			</div>		
			<div className="dropdown dropdown-end">
				<div tabIndex={0} role="button" className="btn m-1 btn-circle hover:bg-primary">
					<IoSettingsOutline className="size-9" />
				</div>
					<ul tabIndex="-1" className="dropdown-content menu bg-gray-700 rounded-box z-1 w-52 p-2 shadow-sm">
						<li ><a onClick={ deleteNotifications }>Delete all notifications</a></li>					
					</ul>
			</div>
		</div>

			{ isLoading && ( <div className="w-full h-screen flex justify-center"> <LoadingSpinner size="xl"/> </div> ) }
			{ notifications?.length === 0 && ( <div className="w-full flex justify-center items-center h-100 font-bold"> <p>No notifications to display 🤣</p> </div> )}
			{ notifications?.map( ( notification ) => (
				<Link to={ `/profile/${notification.from.username}` }>
					<div className="w-full p-4 border-b border-gray-700 hover:bg-gray-900">
						<div className="flex gap-x-4 items-center">
							{
								notification?.type === "follow" ? <FaUser className="text-primary"/> : <FaHeart className="text-pink-600"/>
							}
								<div className="size-8 rounded-field">
									<img src={notification?.from.profileImg||"/avatar-placeholder.png"}alt="Profile picture of sender"
									className="object-cover"/>					
								</div>
								<span className="flex gap-x-1">
									<p>{ `@${notification?.from.username} ` }</p>
									<p>{ notification?.type === "follow" ? "followed you" : "liked your post" }</p>
								</span>
						</div>
					</div>
				</Link>

			) ) }


	</div>
    
  )
}

export default NotificationPage;