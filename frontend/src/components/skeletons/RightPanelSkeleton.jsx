import React from 'react';

const RightPanelSkeleton = () => {
  return (
    <div className="w-full">
        <div className="flex items-center gap-x-2 p-3 bg-gray-700 rounded-2xl">
            <div className="skeleton size-10 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-y-4">
                <div className="skeleton h-4 w-40 rounded-full"></div>
                <div className="skeleton h-3 w-20 rounded-full"></div>
            </div>
        </div>
    </div>
  )
}

export default RightPanelSkeleton;