
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CardComponent = ({className} :any) => {
  return (
    <div className={`${className} bg-[#ffffff] flex flex-col gap-2 p-2 rounded-[5px] 
    self-start cursor-pointer hover:shadow hover:bg-[#e2e2e2] transition-all`}>
      <div className='overflow-hidden rounded-[5px] border-2 border-[#96C8DD] aspect-square'>

        <img className='w-full' src="https://pos.nvncdn.com/5679e9-27451/ps/20240802_pU1MWRnInV.jpeg?v=1722566740" />

      </div>
      <div className='px-2'>

        <div>
          <h1>Wonderella - Bộ 4 cuốn tác giả Alicia Vu</h1>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex items-end gap-3 '>
            <h1 className='text-[14px] text-[#FF6A00]'>640.000 đ</h1>
            <h1 className='text-[12px] text-[#a4a4a4] line-through'>100.000 đ</h1>
          </div>
          <div className='text-[#c0c0c0]'>
            <FontAwesomeIcon icon={faHeart}/>
          </div>
        </div>


      </div>

    </div>
  )
}

export default CardComponent