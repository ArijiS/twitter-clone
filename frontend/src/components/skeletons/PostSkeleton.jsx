import React from 'react';

const PostSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 border-b-2 border-gray-600 p-3">
        <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-40 rounded-full"></div>
                <div className="skeleton h-2 w-28 rounded-full"></div>
            </div>
        </div>
        <div className="skeleton h-80 w-full rounded-2xl"></div>
  </div>
  )
}

export default PostSkeleton;