import React, { useContext } from 'react';

// import Link
import { Link } from 'react-router-dom';

// import icons
import { IoMdArrowForward, IoMdPhonePortrait, IoMdSkipForward } from 'react-icons/io'
import { FiTrash2 } from 'react-icons/fi'

// import conponents
import CartItem from '../components/CartItem'

// import sidebar context
import { SidebarContext } from '../contexts/SidebarContext'
// import cart context
import { CartContext } from '../contexts/CartContext'


const Sidebar = () => {
  // import isOpen state from sidebarcontext.js
  const { isOpen, handleClose } = useContext(SidebarContext)
  const { cart, clearCart, total, itemAmount } = useContext(CartContext)

  return (
    <div
      className={` ${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw]  transition-all duration-300 z-20 px-4 lg:px-[35px]`
      }>
      <div className='flex items-center justify-between py-5 border-b'>
        <div className='uppercase text-sm font-semibold'>shopping Bag ({itemAmount}) </div>
        {/* icon */}
        <div
          onClick={handleClose}
          className='cursor-pointer w-8 h-8 flex justify-center items-center'>
          <IoMdArrowForward className='text-2xl ' />
        </div>
      </div>
      {/* cart */}
      {cart < 1 &&
        <div className='font-medium text-xl tracking-[2px] pt-5'>
          Nothings found
        </div>
      }
      <div className='flex flex-col gap-y-2 h-[65vh] overflow-y-auto overflow-x-hidden border-b pr-6'>
        {cart.map(item => {
          return <CartItem key={item.id} item={item} />
        })}
      </div>
      <div className='flex flex-col gap-y-3 py-4 items-center'>
        <div className=' flex w-full justify-between items-center'>
          {/* total */}
          <div className='uppercase font-semibold'>
            <span className='mr-2'>Total:</span>
            $ {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div
            onClick={clearCart}
            className='cursor-pointer py-4 bg-red-500 hover:bg-red-600 text-white w-12 h-12 flex justify-center items-center text-xl'>
            <FiTrash2 />
          </div>
        </div>

        <Link to={'/'} className='bg-gray-300 hover:bg-gray-400 flex p-4 justify-center items-center text-primary w-full font-medium' >View cart</Link>

        <Link to={'/'} className='bg-primary flex p-4 justify-center items-center text-white w-full font-medium'>Checkout</Link>
      </div>
    </div>
  )
};

export default Sidebar;
