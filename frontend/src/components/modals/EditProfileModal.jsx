import React from 'react'
import { useRef, useState } from 'react';

import { IoMdCloseCircle } from "react-icons/io";

const EditProfileModal = () => {
  const editModalRef = useRef( null );

  const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		bio: "",
		link: "",
		newPassword: "",
		currentPassword: "",
	});

  const handleFormChange = ( e ) => {
    setFormData( ( prev ) => { return {
      ...prev, [e.target.name] : e.target.value
    } } );
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full"
        onClick={() => editModalRef.current.showModal()}
      >
        Edit profile
      </button>

      <dialog ref={editModalRef} className="modal">
        <div className="modal-box flex flex-col gap-y-5 bg-secondary rounded-xl">
          <div className="flex items-center justify-between">
            <form method="dialog" className="flex items-center gap-x-6">
              <button className="cursor-pointer hover:text-primary">
                {" "}
                <IoMdCloseCircle className="size-6" />{" "}
              </button>
              <p className="font-bold text-xl">Edit profile</p>
            </form>
            <button className="btn btn-primary rounded-full">Save</button>
          </div>

          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Fullname"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleFormChange(e)}
              className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={(e) => handleFormChange(e)}
              className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => handleFormChange(e)}
              className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
            />
            <input
              type="text"
              placeholder="Bio"
              name="bio"
              value={formData.bio}
              onChange={(e) => handleFormChange(e)}
              className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <input
              type="password"
              placeholder="Password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={(e) => handleFormChange(e)}
              className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
            />
            <input
              type="password"
              placeholder="New password"
              name="newPassword"
              value={formData.newPassword}
              onChange={(e) => handleFormChange(e)}
              className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
            />
          </div>

          <input
            type="text"
            placeholder="Link"
            name="link"
            value={formData.link}
            onChange={(e) => handleFormChange(e)}
            className="input-md border border-gray-600 px-4 py-2 rounded-lg flex-1"
          />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </>
  );
}

export default EditProfileModal;