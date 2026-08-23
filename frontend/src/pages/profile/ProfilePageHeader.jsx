import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileHeaderSkeleton from '../../components/skeletons/ProfileHeaderSkeleton';
import EditProfileModal from "../../components/modals/EditProfileModal.jsx";
import ProfilePageHeaderDetails from './ProfilePageHeaderDetails.jsx';
import ProfileTabs from './ProfileTabs.jsx';

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { POSTS } from '../../utils/db/dummy.js';


const ProfilePageHeader = () => {

    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

  	const isLoading = false;
	const isMyProfile = true;

	const navigate = useNavigate();

	const user = {
			_id: "1",
			fullName: "John Doe",
			username: "johndoe",
			profileImg: "/avatars/boy2.png",
			coverImg: "/cover.png",
			bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			link: "https://youtube.com/@asaprogrammer_",
			following: ["1", "2", "3"],
			followers: ["1", "2", "3"],
		};

    const handleImgChange = ( e, state ) => {
		const file = e.target.files[0];
		if( file ){
			const reader = new FileReader();
			reader.readAsDataURL( file );
			reader.onload = () => {
				state === "coverImg" && setCoverImg( reader.result );
				state === "profileImg" && setProfileImg( reader.result );
			};
		}
	};
    return (
        <div className="flex flex-col w-full">
            { isLoading && ( <ProfileHeaderSkeleton /> ) }
		    { ( !isLoading && !user ) && <p className="text-center text-lg mt-4">User not found</p> }
			{ ( !isLoading && user ) && (
				<>
					<div className="flex gap-x-10 px-4 py-2 items-center">
						<button className="cursor-pointer mb-2" onClick={ () => navigate( -1 ) }>
							<IoArrowBackCircleOutline className="ml-3 size-10 hover:bg-primary rounded-full"/>
						</button>
						<div className="flex flex-col">
							<p className="text-xl font-bold">{ user.fullName }</p>
							<p className="text-sm">{ POSTS.length }</p>
						</div>
					</div>
					{ /* COVER IMAGE */ }

					<div className="relative group/cover">
						<img src={ coverImg || user?.coverImg || "/cover.png" } alt="Cover image" className='h-52 w-full object-cover'/>
                            { isMyProfile && (
                                <button className="absolute top-4 right-4 btn btn-circle hover:bg-primary" 
                                 onClick= { ()=> coverImgRef.current.click() } >
                                    <MdEdit className="size-5 text-white" />
                                </button>
                            ) }
                        <input type="file" hidden ref={ coverImgRef } onChange={ ( e ) => handleImgChange( e, "coverImg" )  } />

                    { /* COVER IMAGE */ }

                    { /* PROFILE IMAGE */ }
						<input type="file" hidden ref={ profileImgRef } onChange={ ( e ) => handleImgChange( e, "profileImg" ) } />
                        <div className="absolute -bottom-16 left-4">
							<div className="relative size-32">
								<div className="relative size-full rounded-full overflow-hidden">
                                	<img src={ profileImg || user.profileImg || "/avatar-placeholder.png" } alt="Profile page" className="object-cover"/>                                  
                            	</div>
								{ isMyProfile && (
													<button className="absolute -top-1 right-0 btn btn-circle btn-sm hover:bg-primary" 
														onClick= { ()=> profileImgRef.current.click() } >
														<MdEdit className="size-4 text-white" />
													</button>
                                        		 ) }
							</div>
                        </div>
                    { /* PROFILE IMAGE */ }                       
					</div>
					<div className="flex justify-end mt-5 px-4 gap-x-4">
						{ isMyProfile ? 
							<EditProfileModal />:
							<button className="btn btn-primary rounded-full">Follow</button>
						}
						{
							( coverImg || profileImg ) && <button className="btn btn-primary rounded-full">Update</button>	
						}
					</div>
					<ProfilePageHeaderDetails user={ user }/>
					<ProfileTabs />
				</>
			) }
		</div>
  )
}

export default ProfilePageHeader;