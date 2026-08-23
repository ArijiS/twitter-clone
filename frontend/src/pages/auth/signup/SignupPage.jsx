
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import XSvg from "../../../components/svgs/XSvg.jsx";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const SignupPage = () => {

  const [ formData, setFormData ] = useState( {
    fullname: "",
    username : "",
    email: "",
    password: "",    
  } );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( formData );
  };
  const handleInputChange = (e) => {
    const formDataObject = { ...formData };
    formDataObject[e.target.name] = e.target.value;
    setFormData( formDataObject );
  };
  let isError = false;
  return (
    <div className="max-w-360 mx-auto flex px-10 h-dvh">
      <div className="flex-1 hidden lg:flex lg:items-center lg:justify-center">
        <XSvg className="lg:w-2/3 fill-white"/>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form onSubmit={ handleSubmit } className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col">
          <XSvg className="size-20 fill-white lg:hidden mx-auto"/>
          <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>

          <label className="input rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
            type="email"
            placeholder="Email"
            className="grow"
            name="email"
            value={formData.email}
            onChange={ handleInputChange }
            />
          </label>

          <label className="input rounded flex items-center gap-2">
            <FaUser />
            <input
            type="text"
            placeholder="Username"
            className="grow"
            name="username"
            value={formData.username}
            onChange={ handleInputChange }
            />
          </label>

          <label className="input rounded flex items-center gap-2">
            <MdDriveFileRenameOutline />
            <input
            type="text"
            placeholder="Full name"
            className="grow"
            name="fullname"
            value={formData.fullName}
            onChange={ handleInputChange }
            />
          </label>

          <label className="input rounded flex items-center gap-2">
            <MdPassword />
            <input
            type="password"
            placeholder="Password"
            className="grow"
            name="password"
            value={formData.password}
            onChange={ handleInputChange }
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">Sign up</button>
        </form>
        { isError && ( <p className="text-red-500 mt-2">Something went wrong</p> ) }
        <div className="lg:w-2/3 flex flex-col gap-4 mt-4">
          <p className="text-lg text-center">Already have an account?</p>
          <button className="btn rounded-full border-2 bg-transparent hover:btn-primary hover:bg-primary w-full"
          onClick={ ()=> navigate("/login") }
          >Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;