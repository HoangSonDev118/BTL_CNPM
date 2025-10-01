"use client"
import ButtonComponent from '@/components/ButtonComponent';
import CardComponent from '@/components/CardComponent'
import { faChevronLeft, faChevronRight, faFill, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Carousel, Checkbox, Pagination, PaginationProps, Select } from 'antd'
import { CarouselRef } from 'antd/es/carousel';
import React, { useRef } from 'react'

const page = () => {
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
    };


      const carouselRef = useRef<CarouselRef | null>(null);
    
      const handlePrev = () => {
        carouselRef.current?.prev();
      };
    
      const handleNext = () => {
        carouselRef.current?.next();
      };

    return (
        <div>
            <section className="text-[white] flex flex-col gap-5 justify-center items-center w-full h-35 m-auto bg-[url('/assets/bg5.png')] bg-[#9ac9db] bg-bottom bg-repeat-x">
                <div className='text-2xl'>Danh mục tổng hợp</div>
                <Breadcrumb
                    items={[
                        {
                            title: <a href="/">Home</a>,
                        },
                        {
                            title: <a href="">Danh mục tổng hợp</a>,
                        },
                    ]}
                />
            </section>
            <section className='w-[1200px] m-auto  flex mt-10'>

                <div className='flex-1 pt-5 sticky top-[0px] h-[1000px]'>
                    <div className='flex flex-col text-[20px]'>

                        <div className="pb-7 relative inline-block after:content-[''] after:block after:w-20 after:h-[2px] after:bg-red-400 after:mt-5">Danh mục tổng hợp</div>
                        <div className='flex flex-col gap-4 text-[15px]'>
                            <span>Sách truyện thiếu nhi</span>
                            <span>Truyện tranh</span>
                            <span>Flashcards</span>
                            <span>Vở Wipe clean</span>
                            <span>Vở học từ mới cho bé</span>
                            <span>Hộp quà tặng cho bé</span>
                        </div>
                        <div className="pb-7 mt-14 relative inline-block after:content-[''] after:block after:w-20 after:h-[2px] after:bg-red-400 after:mt-5">Sách theo độ tuổi</div>
                        <div className='flex flex-col gap-4 text-[15px]'>
                            <span>Sách cho bé 0 - 1 -2 tuổi</span>
                            <span>Sách cho bé 3+ tuổi</span>
                            <span>Sách cho bé 4+ tuổi</span>
                            <span>Sách cho bé 5+ tuổi</span>
                            <span>Sách cho bé 6+ tuổi</span>
                            <span>Sách cho bé 8+ tuổi</span>
                        </div>
                        <div className="pb-7 mt-14 relative inline-block after:content-[''] after:block after:w-20 after:h-[2px] after:bg-red-400 after:mt-5">Giá thành</div>
                        <div className='flex flex-col gap-4 text-[15px]'>
                            <span><Checkbox/>  Dưới 50.000đ</span>
                            <span><Checkbox/>  Từ 50.000đ đến 150.000đ</span>
                            <span><Checkbox/>  Từ 150.000đ đến 300.000đ</span>
                            <span><Checkbox/>  Từ 300.000đ đến 500.000đ</span>
                            <span><Checkbox/>  Trên 500.000đ</span>
                            {/* <span><Checkbox/>  Hộp quà tặng cho bé</span> */}
                        </div>
                    </div>
                    {/* <div>

                        <div>Danh mục tổng hợp</div>
                        <div>
                            <span>Sách truyện thiếu nhi</span>
                            <span>Truyện tranh</span>
                            <span>Flashcards</span>
                            <span>Vở Wipe clean</span>
                            <span>Vở học từ mới cho bé</span>
                            <span>Hộp quà tặng cho bé</span>
                        </div>
                    </div> */}
                </div>
                <div className='flex-3 '>
                    <div className='p-5 flex justify-between'>
                        <div><h1>Hiển thị 1 - 20 trong 181 sản phẩm</h1></div>
                        <div className='flex gap-3 items-center'>
                            <div>
                                <span>Sắp xếp theo</span>
                                <FontAwesomeIcon icon={faFilter} />
                            </div>
                            <Select
                                style={{ width: 160 }}
                                popupMatchSelectWidth={false}
                                defaultValue="Mới nhất"
                                placement={"bottomRight"}
                                loading
                                options={[
                                    {
                                        value: 'mới nhất',
                                        label: 'Mới nhất',
                                    },
                                    {
                                        value: 'cũ nhất',
                                        label: 'Cũ nhất',
                                    },
                                    {
                                        value: 'giá thấp nhất',
                                        label: 'Giá thấp nhất',
                                    },
                                    {
                                        value: 'giá cao nhất',
                                        label: 'Giá cao nhất',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className='p-5 flex justify-center'>

                        <Pagination
                            // showSizeChanger
                            // onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={500}
                        />
                    </div>
                    <div className='grid grid-cols-4 gap-2'>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />

                    </div>
                    <div className='pt-15 flex justify-center'>

                        <Pagination
                            // showSizeChanger
                            // onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={500}
                        />
                    </div>


                </div>
            </section>

            <section className="w-full p-20 mt-30
      


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

        </div>
    )
}

export default page