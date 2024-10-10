import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../myComponents/Logo'

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-25 flex items-center justify-between px-4">
      <div>
        <Logo to="/admin/dashboard" />
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">

          <p className='text-lg pr-3'>{user?.name}</p>
          <img
            src={`${user?.avatar?.url}`}
            alt=""
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader