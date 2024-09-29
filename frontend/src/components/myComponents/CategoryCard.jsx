import React from 'react'
import { Link } from 'react-router-dom'


const CategoryCard = ({
  imageSrc,
  altText,
  categoryName,
  handleSubmit
}) => {
  return (
    <div className="relative h-[350px] rounded-md overflow-hidden">
      <img className="w-full h-full object-cover block rounded-sm" src={imageSrc} alt="" />
      <div className='absolute top-0 bg-black opacity-40 w-full h-full rounded-md'>
        <div className="h-full flex justify-center flex-col items-center opacity-100 text-white">
          <img src={imageSrc} className="w-24 h-24 rounded-full block" alt="" />
          <h3 className="mt-3 text-center text-base font-semibold  content-center">
            {categoryName}
          </h3>
          <button onClick={()=>handleSubmit()}>See More</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryCard