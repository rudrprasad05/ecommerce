import React from 'react'

const Skeleton = ({input, textOnly, product, additionalClasses, img, imgClasses, text, textClasses}) => {
  if(product)
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
      
  if(textOnly)
  return(
    <div className='mb-5'>
      <div className='w-full h-5 mb-2 rounded-md skeleton'></div>
      <div className='w-1/2 h-5 mb-2 rounded-md skeleton'></div>
    </div>
  )

  if(input)
  return(
    <div className='skeleton w-full h-12 rounded-md'>

    </div>
  )
}

export default Skeleton