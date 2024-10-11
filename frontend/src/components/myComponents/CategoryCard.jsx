import React from 'react'
import { Link } from 'react-router-dom'


const CategoryCard = ({
  imageSrc,
  altText,
  categoryName,
  handleSubmit
}) => {
  return (

    <div onClick={handleSubmit} className=" group relative h-[350px] rounded-md overflow-hidden">
      <img className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-12 duration-500 block rounded-sm" src={imageSrc} alt="" />
      <div className='absolute top-0 bg-black group-hover:opacity-0 duration-500  opacity-30 w-full h-full rounded-md content-center'>
        <h3 className="mt-3 text-center text-lg font-semibold content-center text-white ">
          {categoryName}
        </h3>
      </div>
    </div>
  )
}

export default CategoryCard