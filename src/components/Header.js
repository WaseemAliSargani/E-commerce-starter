import React, { useContext, useState, useEffect } from 'react';
//  sidebar context
import { SidebarContext } from '../contexts/SidebarContext';

// import icons
import { BsBag } from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext';
// import link
import { Link } from 'react-router-dom';
//  import logo
import Logo from '../img/logo.svg'


const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false)

  // import setIsopen state from sidebarcontext.js
  const { isOpen, setIsOpen } = useContext(SidebarContext)
  const { itemAmount } = useContext(CartContext)

  // event listener 
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false)
    })
  })



  return (
    <header className={`
      ${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-4'
      } fixed w-full z-20 transition-all`}>
      <div className='container mx-auto flex justify-between items-center h-full'>

        {/* logo */}
        <Link to={'/'}>
          <div>
            <img className='w-[80px]' src={Logo} alt="" />
          </div>
        </Link>

        {/* cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='cursor-pointer flex relative'>
          <BsBag className='text-2xl ' />

          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center '>
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;
