import React from 'react'

const CardComponent = () => {
  return (
    <div className='bg-[#f4f4f4] w-[224px] flex flex-col gap-2 p-2 rounded-[5px] self-start cursor-pointer hover:shadow hover:bg-[#e2e2e2] transition-all'>
        <div className='overflow-hidden rounded-[5px] border-2 border-[#96C8DD] h-[204px] '>

            <img className='w-full' src="https://pos.nvncdn.com/5679e9-27451/ps/20240802_pU1MWRnInV.jpeg?v=1722566740"/>

        </div>

        <div>
            <h1>Wonderella - Bộ 4 cuốn tác giả Alicia Vu</h1>
        </div>

        <div className='flex items-end gap-3'>
            <h1 className='text-2xl text-[#FF6A00]'>64.000 đ</h1>
            <h1 className='text-[15px] text-[#a4a4a4] line-through'>100.000 đ</h1>
        </div>

    </div>
  )
}

export default CardComponent