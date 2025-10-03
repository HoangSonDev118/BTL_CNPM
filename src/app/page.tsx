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

      {/* <nav className='max-w-[1200px] flex justify-center gap-10 items-center my-5'>


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
      </nav> */}

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







      <section className='w-[1200px] mt-10'>
        <div className="flex flex-col items-center justify-center bg-[url('/assets/banner.jpg')] bg-[length:100%_100%] bg-no-repeat bg-center h-[350px] rounded-[15px]">
          <div className='flex items-center justify-center w-full'>
            <div className="w-[10%] border-2 border-gray-300"></div>
            <h1 className='mx-10 text-5xl text-center text-[#6a6a6a] border-2 border-[#6a6a6a] px-10 py-5'>ENFANTS BOOKS</h1>
            <div className="w-[10%] border-2 border-gray-300"></div>
          </div>
          <h2 className='my-8 text-3xl text-[#969696]  '>Nhà phát hành sách đồng hành cùng giai đoạn phát triển của trẻ</h2>
        </div>
      </section>



      <div className='separation w-full my-10'>
        <a className={`${activeIndex === 0 ? 'separation-active' : ''} `} href="tel: +84971833093"><h4>Liên hệ ngay với Hotline: +84971833093</h4></a>
        <a className={`${activeIndex === 1 ? 'separation-active' : ''} `} href="https://m.me/104988175154682" target="_blank"><h4>Chat ngay qua Mesenger  </h4></a>
        <a className={`${activeIndex === 2 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
        <a className={`${activeIndex === 3 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" ><h4>Liên hệ qua Email</h4></a>
      </div>

      {/* <section className='grid grid-cols-4 gap-5 justify-items-center'> */}
      <section className='max-w-[1200px] '>
        <div className="flex flex-col items-center justify-center bg-[url('/assets/banner2.jpg')] bg-[length:100%_100%] bg-no-repeat bg-center h-[300px] rounded-[15px]">
          {/* <h1 className='m-8 text-5xl text-center text-[#525252] pb-7'>Sản phẩm nổi bật</h1> */}
          <h1 className='mx-10 text-5xl text-center text-[#6a6a6a] px-10 py-5'>Sản phẩm nổi bật</h1>
          {/* <div className='flex items-center justify-center w-full'>
          </div> */}
          <h2 className='my-8 text-[20px] text-[#969696] border-[#dbdbdb] border-t-1 pt-5 '>Danh sách những sản phẩm mùa Holiday mới nhất của chúng tôi</h2>
        </div>

        <div className='relative px-15 my-10'>
          <Carousel draggable swipeToSlide dots={false} slidesToShow={5}
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
        </div>

        <ButtonComponent content="Đăng nhập" type='primary' />
      </section>

      <section className='w-[1200px] my-10'>
        <h1 className='text-center text-2xl my-5'>Con bạn đang thuộc độ tuổi nào ?</h1>
        <div className='w-full flex justify-around'>
          <div className=' text-[30px] p-10 border-3 text-[#C0E6F5] border-[#C0E6F5] rounded-[20px] cursor-pointer transition-all hover:bg-[#C0E6F5] hover:text-[#fffd]'>
            <h2>0-2 tuổi</h2>
          </div>
          <div className=' text-[30px] text-[#FBE2D5] p-10 border-3 border-[#FBE2D5] rounded-[20px] cursor-pointer transition-all hover:bg-[#FBE2D5] hover:text-[#fffd]'>

            <h2>3+ tuổi</h2>
          </div>
          <div className=' text-[30px] text-[#C1F0C8] p-10 border-3 border-[#C1F0C8] rounded-[20px] cursor-pointer transition-all hover:bg-[#C1F0C8] hover:text-[#fffd]'>

            <h2>4+ tuổi</h2>
          </div>
          <div className=' text-[30px] text-[#F2CEEF] p-10 border-3 border-[#F2CEEF] rounded-[20px] cursor-pointer transition-all hover:bg-[#F2CEEF] hover:text-[#fffd]'>

            <h2>5+ tuổi</h2>
          </div>
          <div className=' text-[30px] text-[#ffda70] p-10 border-3 border-[#ffda70] rounded-[20px] cursor-pointer transition-all hover:bg-[#ffda70] hover:text-[#fffd]'>

            <h2>6+ tuổi</h2>
          </div>
          <div className=' text-[30px] text-[#bcbcbc] p-10 border-3 border-[#bcbcbc] rounded-[20px] cursor-pointer transition-all hover:bg-[#bcbcbc] hover:text-[#fffd]'>

            <h2>8+ tuổi</h2>
          </div>
        </div>
      </section>


      <div className='separation w-full'>
        <a className={`${activeIndex === 1 ? 'separation-active' : ''} `} href="tel: +84971833093"><h4>Liên hệ ngay với Hotline: +84971833093</h4></a>
        <a className={`${activeIndex === 2 ? 'separation-active' : ''} `} href="https://m.me/104988175154682" target="_blank"><h4>Chat ngay qua Mesenger  </h4></a>
        <a className={`${activeIndex === 3 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
        <a className={`${activeIndex === 0 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" ><h4>Liên hệ qua Email</h4></a>
      </div>

      <section className="w-full p-20 
      


              bg-[#f15f61] 
  [background-image:url('/assets/bg1.png'),url('/assets/bg2.png')] 
  [background-position:top_left,bottom_right] 
  [background-repeat:no-repeat,no-repeat] border-b-4
            ">
        <div className='max-w-[1200px] mx-auto'>

          <div className='my-10 grid grid-cols-5 gap-5 justify-items-center'>
            <CardComponent className="col-span-2 row-span-2" />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </div>
          <ButtonComponent content="Xem thêm" type='primary' />
        </div>
      </section>


      <section className='max-w-[1200px] mt-15 bg-[#fff6e4] rounded-[5px] p-5'>
        <div>

          <div className="pb-30 flex flex-col items-center justify-center bg-[url('/assets/bg3.png')] bg-[length:70%_90%] bg-no-repeat bg-center h-[300px]">
            {/* <h1 className='m-8 text-5xl text-center text-[#525252] pb-7'>Sản phẩm nổi bật</h1> */}
            {/* <h1 className='mx-10 text-5xl text-center text-[#6a6a6a] px-10 py-5'>Sản phẩm nổi bật</h1> */}
            <svg viewBox="0 0 500 200" className="w-full h-40">
              <path id="curve" d="M 20 130 Q 250 50 480 130" fill="transparent" />
              <text fontSize="50" fontWeight="bold" fill="white" textAnchor="middle">
                <textPath href="#curve" startOffset="50%" textLength="460" lengthAdjust="spacingAndGlyphs">
                  Sản phẩm bán chạy
                </textPath>
              </text>

            </svg>





            {/* <div className='flex items-center justify-center w-full'>
          </div> */}
            {/* <h2 className='my-8 text-[20px] text-[#969696] border-[#dbdbdb] border-t-1 pt-5 '>Danh sách những sản phẩm mùa Holiday mới nhất của chúng tôi</h2> */}
          </div>

          <div className='relative px-15 my-10'>
            <Carousel draggable swipeToSlide dots={false} slidesToShow={5}
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
          </div>

          <ButtonComponent content="Đăng nhập" type='primary' />
        </div>
      </section>


      <div className='separation w-full mt-10'>
        <a className={`${activeIndex === 1 ? 'separation-active' : ''} `} href="tel: +84971833093"><h4>Liên hệ ngay với Hotline: +84971833093</h4></a>
        <a className={`${activeIndex === 2 ? 'separation-active' : ''} `} href="https://m.me/104988175154682" target="_blank"><h4>Chat ngay qua Mesenger  </h4></a>
        <a className={`${activeIndex === 3 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" target="_blank"><h4>Chat ngay qua Zalo</h4></a>
        <a className={`${activeIndex === 0 ? 'separation-active' : ''} `} href="https://zalo.me/0971833093" ><h4>Liên hệ qua Email</h4></a>
      </div>
      <section className="w-full p-20 
      


              bg-[#ab8585] 
  [background-image:url('/assets/bg1.png'),url('/assets/bg2.png')] 
  [background-position:top_left,bottom_right] 
  [background-repeat:no-repeat,no-repeat] border-b-4
            ">


        <div className='max-w-[1200px] mx-auto'>
          <div className='text-center text-5xl mb-20 flex justify-center items-center gap-10'>
            <h1 className='text-[white]'>Sản phẩm đang khuyến mãi </h1>
            <img className='zoom-anim w-[70px]' src="/assets/fire.png" alt="" />
          </div>
          {/* <div className='my-10 grid grid-cols-5 gap-5 justify-items-center'>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </div> */}
          <div className='relative px-15 my-10'>
            <Carousel draggable swipeToSlide dots={false} slidesToShow={5}
              ref={carouselRef}
            >
              <div className='px-3'>
                <CardComponent />
              </div>
              <div className='px-3'>
                <CardComponent />
              </div>
              <div className='px-3'>
                <CardComponent />
              </div>
              <div className='px-3'>
                <CardComponent />
              </div>
              <div className='px-3'>
                <CardComponent />
              </div>
              <div className='px-3'>
                <CardComponent />
              </div>
              <div className='px-3'>
                <CardComponent />
              </div>


            </Carousel>
            <span className="text-[#CDC1FF] text-[40px] absolute top-1/2 transform -translate-y-1/2 right-0 hover:bg-[#e2e2e2] cursor-pointer py-1 rounded-[5px] transition-all" onClick={handleNext}><FontAwesomeIcon icon={faChevronRight} /></span>
            <span className="text-[#CDC1FF] text-[40px] absolute top-1/2 transform -translate-y-1/2 left-0 hover:bg-[#e2e2e2] cursor-pointer py-1 rounded-[5px] transition-all" onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft} /></span>
          </div>
          <ButtonComponent content="Xem thêm" type='primary' />
        </div>
      </section>

      <section className='mt-30'>
        <div>
          <div className='flex items-center justify-center w-full'>
            <div className="w-[30%] border-1 border-gray-300"></div>
            <h1 className='text-3xl text-center text-[#6a6a6a] px-10'>Các đối tác</h1>
            <div className="w-[30%] border-1 border-gray-300"></div>
          </div>
          <h2 className='mb-15 mt-5 text-[17px] text-[#969696] text-center'>Danh sách các đối tác của chúng tôi</h2>
        </div>
        <div className='flex gap-10'>
          <img className='w-[100px] h-auto' src="/assets/cp1.png" alt="" />
          <img className='w-[100px] h-auto' src="/assets/cp2.png" alt="" />
          <img className='w-[100px] h-auto' src="/assets/cp3.jpeg" alt="" />
          <img className='w-[100px] h-auto' src="/assets/cp4.png" alt="" />
          <img className='w-[100px] h-auto' src="/assets/cp5.jpeg" alt="" />
          <img className='w-[100px] h-auto' src="/assets/cp6.png" alt="" />
        </div>

      </section>


    </div >
  );
}
