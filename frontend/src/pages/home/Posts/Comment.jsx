import React from 'react'

const Comment = ( { comment } ) => {
  return (
    <div className="w-full flex p-4 items-center gap-x-4 border-b-2 border-gray-600">
        <div className="size-10 rounded-full">
            <img src={ comment.user.profileImg } alt="Profile Image" className="object-cover"/>
        </div>
        <div className="flex flex-col">
            <div className="flex gap-x-2 items-center">
                <p className="font-bold">{ comment.user.fullName }</p>
                <p className="font-light">{ `@${comment.user.username}` }</p>
                <p className="font-light">{`• 1h`}</p>
            </div>
            <p>{ comment.text }</p>
        </div>
    </div>
  )
}

export default Comment