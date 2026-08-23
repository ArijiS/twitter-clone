import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import XSvg from "../../../components/svgs/XSvg.jsx";

const LoginPage = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	const handleInputChange = (e) => {
		const formDataObject = { ...formData };
    formDataObject[ e.target.name ] = e.target.value;
    setFormData( formDataObject );
	};

  const navigate = useNavigate();

	const isError = false;

  return (
    <div className='max-w-360 mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-20 lg:hidden fill-white mx-auto' />
					<h1 className='text-4xl font-extrabold text-white text-center'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>Login</button>
					{isError && <p className='text-red-500'>Something went wrong</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>

					<p className='text-white text-lg'>{"Don't"} have an account?</p>					
					<button className="btn rounded-full border-2 bg-transparent hover:btn-primary hover:bg-primary w-full"
          onClick={ ()=> navigate("/signup") }>Sign up</button>
					
				</div>
			</div>
		</div>
  )
}

export default LoginPage;