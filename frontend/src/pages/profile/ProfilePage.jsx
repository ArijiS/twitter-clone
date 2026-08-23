import React from 'react';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import EditProfileModal from "../../components/modals/EditProfileModal";
import ProfilePageHeader from './ProfilePageHeader';
import Posts from '../home/Posts/Posts';



const ProfilePage = () => {

	const [feedType, setFeedType] = useState("posts");

  return (
    <div className="w-full flex flex-col">
		<ProfilePageHeader />
    <Posts />
		
	</div>
  )
}

export default ProfilePage;