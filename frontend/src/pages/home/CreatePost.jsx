import React from 'react';
import { useState, useRef } from 'react';

import { FaImage } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const CreatePost = () => {

  const [ text, setText ] = useState( "" );
  const [ img, setImg ] = useState( null );

  const imgRef = useRef( null );

  const data = {
    profileImg: "/avatars/boy1.png"
  };

  const isPending = false;
  const isError = false;

  const handleSubmit = ( e ) => {
    e.preventDefault();
    alert( "Post create successfully" );
  };

  const handleImgChange = ( e ) => {
    const file = e.target.files[ 0 ];
    if( file ){
      const reader = new FileReader();
      reader.readAsDataURL( file ); //async operation
      reader.onload = ()=> setImg( reader.result ) ;
    };
  };

  return (
    <div className="p-4 flex items-start gap-x-4 w-full border-b-2 border-gray-600">

      <div className="avatar mb-auto">
        <div className="size-10 rounded-full">
          <img alt="User profile image" src={ data.profileImg || "/avatar-placeholder.png" }/>
        </div>
      </div>

      <form onSubmit={ handleSubmit } className="w-full flex flex-col">
        <textarea value={ text }
        onChange={ ( e ) => {
          setText( e.target.value );
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        } }
        placeholder={ `What's happening?` }
          className="w-full text-lg mb-3 resize-none focus:outline-none focus:border-b focus:border-gray-600"
          />

        { img && (
          <div className="relative w-full h-auto overflow-hidden rounded-xl bg-amber-100">
            <IoMdCloseCircle className="absolute text-primary bg-white rounded-full size-8 top-2 right-2 cursor-pointer hover:scale-110 transition-all"
            onClick={ ()=>{
              setImg( null );
              imgRef.current.value = null;
            } }
            />
            <img src={img} alt="Post preview" className="w-full object-contain"/>
          </div>
        ) }


        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            <button type="button" className="cursor-pointer p-2 rounded-full hover:bg-gray-600">
              <FaImage className="size-6" onClick={ () => imgRef.current.click() }/>
            </button>
            <button type="button" className="cursor-pointer p-2 rounded-full hover:bg-gray-600">
              <BsEmojiSmileFill className="size-6"/>
            </button>
            <input type="file" hidden ref={ imgRef } onChange={ ( e ) => handleImgChange( e ) }/>
          </div>
          <button className="btn px-5 bg-white rounded-full text-secondary">Post</button>
        </div>

      </form>

    </div>
  )
}

export default CreatePost