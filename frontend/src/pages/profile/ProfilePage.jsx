import React from 'react';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { postsQueryFn } from '../../utils/db/queries.js';

import EditProfileModal from "../../components/modals/EditProfileModal";
import ProfilePageHeader from './ProfilePageHeader';
import Posts from '../home/Posts/Posts';


const ProfilePage = () => {

  const { data:posts, isPending } = useQuery( {
    queryKey: [ "posts" ],
    queryFn: () => postsQueryFn("all"),
  } );

  return (
    <div className="w-full flex flex-col">
		<ProfilePageHeader />
    <Posts posts={ posts } isPending={ isPending } />
		
	</div>
  )
}

export default ProfilePage;