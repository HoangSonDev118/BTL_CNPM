
"use client";

import React, { useState } from 'react'

import { Dropdown, Input, MenuProps, Select, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faSearch, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const { Search } = Input;
const Header = () => {

  const [open, setOpen] = useState(false);

  const items = [
    {
      key: "1",
      label: <span className=' text-[15px]'>Đăng nhập</span>,
    },
    {
      key: "2",
      label: <span className=' text-[15px]'>Đăng ký</span>,
    },
    {
      key: "3",
      label: <span className=' text-[15px]'>Đăng xuất</span>,
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      danger: true,
    },
  ];

  const itemsMenu: MenuProps['items'] = [

    {
      key: '1',
      label: 'Danh mục tổng hợp',
      children: [
        {
          key: '1-1',
          label: '5d menu item',
        },
        {
          key: '1-2',
          label: '6th menu item',
        },
      ],
    },
    {
      key: '2',
      label: 'Sách theo độ tuổi',
      children: [
        {
          key: '2-1',
          label: '5d menu item',
        },
        {
          key: '2-2',
          label: '6th menu item',
        },
      ],
    },
    {
      key: '3',
      label: 'disabled sub menu',
      disabled: true,
      children: [
        {
          key: '3-1',
          label: '5d menu item',
        },
        {
          key: '3-2',
          label: '6th menu item',
        },
      ],
    },
  ];



  return (
    <div className='w-full 
    flex flex-col items-center
      
    '>
      <div className='bg-[#fff8e7] w-full'>
        <div className='
       w-[1200px]
      flex justify-between items-center h-[100px] gap-10 max-w-[1200px] m-auto
        '
        >
          <div className='flex-2'>
            <img src="/logos/logo.png" className='w-12' />
          </div>

          <div className='flex-6'>
            <Search addonBefore={<FontAwesomeIcon icon={faSearch} />}
              placeholder="Nhập để tìm kiếm sản phẩm của bạn"
              enterButton="Tìm kiếm" size="large"
            />
          </div>

          <div className='text-2xl flex justify-end gap-5 items-center flex-2'>
            <div>
              <Dropdown
                menu={{ items }}
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
                open={open}
                onOpenChange={(flag) => setOpen(flag)}

              >
                <a onClick={(e) => e.preventDefault()}>
                  <div className={`cursor-pointer ${open ? 'text-[#96C8DD]' : 'text-[#535353]'}`}>

                    <FontAwesomeIcon icon={faUser} /> <span className='text-[16px]'>Tài khoản</span>
                  </div>
                </a>
              </Dropdown>
            </div>
            <div className='border-1 h-6 border-[#c1c1c1]'></div>
            <div>
              <FontAwesomeIcon icon={faBagShopping} className='cursor-pointer hover:text-[#96C8DD]' />

            </div>

          </div>


        </div>
      </div>
      <nav className=' w-[1200px] flex justify-center gap-10 items-center my-5'>


        <span>Trang chủ</span>

        <span>

          <Dropdown menu={{ items: itemsMenu }} arrow={{ pointAtCenter: true }}>
            <Space>Danh mục sách</Space>
          </Dropdown>


        </span>



        <span className='mx-10'>
          <img src="/logos/logo.png" className='w-12' />
        </span>

        <span>Sách đang ưu đãi</span>

        <span>Liên hệ</span>
      </nav>

    </div>
  )
}

export default Header