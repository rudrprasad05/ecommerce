import React from 'react'

const Skeleton = ({additionalClasses, img, imgClasses, text, textClasses}) => {
  return (
    <div className={`skeleton ${additionalClasses} overflow-clip`}>
        {img && 
        <div className={`${imgClasses} skeleton-img`}>

        </div>
        }
        {
          text &&
          (<div className={`h-full w-full flex flex-col gap-2 justify-center`}>
            <div className={`${textClasses} skeleton-img rounded-md w-1/2 `}></div>
            <div className={`${textClasses} skeleton-img rounded-md w-1/3`}></div>
          </div>)
        }
    </div>
  )
}

export default Skeleton