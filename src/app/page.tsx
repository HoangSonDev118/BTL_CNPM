'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { Carousel, Dropdown, MenuProps, Space } from 'antd';
import CardComponent from '@/components/CardComponent';
import ButtonComponent from '@/components/ButtonComponent';
import { useEffect, useRef, useState } from 'react';
import { CarouselRef } from 'antd/es/carousel';




export default function Home() {


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



  const carouselRef = useRef<CarouselRef | null>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className='w-full flex flex-col items-center'>

      <nav className='max-w-[1200px] flex justify-center gap-10 items-center my-5'>


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

      <section className='max-w-[1200px] '>
        <Carousel draggable swipeToSlide autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
          <div>
            <img src="https://pos.nvncdn.com/5679e9-27451/bn/20250523_CpU3AO5i.gif?v=1747974773" alt="" />
          </div>
          <div>
            <img src="https://pos.nvncdn.com/5679e9-27451/bn/20250520_u0tk6AVL.gif?v=1747711112" alt="" />
          </div>
          <div>
            <img src="https://pos.nvncdn.com/5679e9-27451/bn/20250107_HRZhQmSo.gif?v=1736241946" alt="" />
          </div>
          <div>
            <img src="https://pos.nvncdn.com/5679e9-27451/bn/20240717_vdHNhklV.gif?v=1721205944" alt="" />
          </div>
        </Carousel>
      </section>


      <div className='separation w-full'>
        <a className={`${activeIndex === 0 ? 'separation-active' : ''} `} href="tel: +84971833093"><h4>Liên hệ ngay với Hotline: +84971833093</h4></a>
        <a className={`${activeIndex === 1 ? 'separation-active' : ''} `} href="https://m.me/104988175154682" target="_blank"><h4>Chat ngay qua Mesenger  </h4></a>
        <a className={`${activeIndex === 2 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
        <a className={`${activeIndex === 3 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" ><h4>Liên hệ qua Email</h4></a>
      </div>





      <section className='w-[1200px] '>

        <div className="flex flex-col items-center justify-center bg-[url('/assets/baner.jpg')] bg-cover bg-center h-[600px] border-1">
          <div className='flex items-center justify-center w-full'>
            <div className="w-[15%] border-2 border-gray-300"></div>
            <h1 className='m-8 text-5xl text-center text-[#525252]'>ENFANTS BOOKS</h1>
            <div className="w-[15%] border-2 border-gray-300"></div>
          </div>
          <h2 className='my-8 text-3xl text-[#787878] mb-30 '>Nhà phát hành sách đồng hành cùng giai đoạn phát triển của trẻ</h2>
        </div>
      </section>



      {/* <section className='grid grid-cols-4 gap-5 justify-items-center'> */}
      <section className='max-w-[1200px] relative px-15'>
        <Carousel draggable swipeToSlide dots={false} slidesToShow={4}
          ref={carouselRef}
        >

          <div className='px-3'>
            <div className='flex flex-col gap-5'>
              <CardComponent />
              <CardComponent />
            </div>
          </div>
          <div className='px-3'>
            <div className='flex flex-col gap-5'>
              <CardComponent />
              <CardComponent />
            </div>
          </div>
          <div className='px-3'>
            <div className='flex flex-col gap-5'>
              <CardComponent />
              <CardComponent />
            </div>
          </div>
          <div className='px-3'>
            <div className='flex flex-col gap-5'>
              <CardComponent />
              <CardComponent />
            </div>
          </div>
          <div className='px-3'>
            <div className='flex flex-col gap-5'>
              <CardComponent />
              <CardComponent />
            </div>
          </div>
          <div className='px-3'>
            <div className='flex flex-col gap-5'>
              <CardComponent />
              <CardComponent />
            </div>
          </div>

        </Carousel>
        <span className="text-[#CDC1FF] text-[40px] absolute top-1/2 transform -translate-y-1/2 right-0 hover:bg-[#e2e2e2] cursor-pointer py-1 rounded-[5px] transition-all" onClick={handleNext}><FontAwesomeIcon icon={faChevronRight} /></span>
        <span className="text-[#CDC1FF] text-[40px] absolute top-1/2 transform -translate-y-1/2 left-0 hover:bg-[#e2e2e2] cursor-pointer py-1 rounded-[5px] transition-all" onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft} /></span>
      </section>


      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </div>
  );
}
