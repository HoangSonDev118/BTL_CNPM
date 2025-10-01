import { faChevronRight, faClock, faCodeBranch, faLocationDot, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col mt-30'>
            <div className="bg-[url('/assets/bg4.png')] bg-repeat-x h-2"></div>
            <div className='bg-[#f2f2f2] py-10 '>
                <div className='grid grid-cols-4 max-w-[1200px] mx-auto gap-5'>
                    <div className='py-5 '>
                        <div className=' flex items-center gap-5'>
                            <span className='w-10 text-[white] flex items-center justify-center aspect-square text-[22px] rounded-[50%] bg-[#c1f0c8]'><FontAwesomeIcon icon={faLocationDot} /></span>
                            <span className='text-[20px]'>Địa chỉ</span>
                        </div>
                        <div className='pl-5 text-[14px]'>
                            <span className='block'>Số 5, ngõ 379 Hoàng Hoa Thám, Ba Đình, Hà Nội</span>
                        </div>
                    </div>
                    <div className='py-5 '>
                        <div className=' flex items-center gap-5'>
                            <span className='w-10 text-[white] flex items-center justify-center aspect-square text-[22px] rounded-[50%] bg-[#fbe2d5]'><FontAwesomeIcon icon={faClock} /></span>
                            <span className='text-[20px]'>Giờ làm việc</span>
                        </div>
                        <div className='pl-5 text-[14px]'>
                            <span className='block'>Thứ 2 - Thứ 7</span>
                            <span className='block'>7:00 - 18:00</span>
                        </div>
                    </div>
                    <div className='py-5 '>
                        <div className=' flex items-center gap-5'>
                            <span className='w-10 text-[white] flex items-center justify-center aspect-square text-[22px] rounded-[50%] bg-[#f2ceef]'><FontAwesomeIcon icon={faMobileScreenButton} /></span>
                            <span className='text-[20px]'>Liên hệ</span>
                        </div>
                        <div className='pl-5 text-[14px]'>
                            <span className='block'>Hotline: 0356322298, 0338561883</span>
                            <span className='block'>Email: hson.dev.118@gmail.com</span>
                            <span className='block'>Website: www.abc.com</span>
                        </div>
                    </div>
                    <div className='py-5 '>
                        <div className=' flex items-center gap-5'>
                            <span className='w-10 text-[white] flex items-center justify-center aspect-square text-[22px] rounded-[50%] bg-[#c0e6f5]'><FontAwesomeIcon icon={faCodeBranch} /></span>
                            <span className='text-[20px]'>Kết nối</span>
                        </div>
                        <div className='pl-5 text-[14px]'>
                            <span className='block'>Số 5, ngõ 379 Hoàng Hoa Thám, Ba Đình, Hà Nội</span>

                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-4 max-w-[1200px] mx-auto gap-10 border-t-1 border-[#cccc] mt-5 pt-5'>
                    <div className='py-5 '>
                        <div className='flex items-end gap-5'>
                            <img src="/logos/logo.png" alt="" className='w-[100px]' />
                            <span className='text-[22px]'>Enfants Books</span>
                        </div>
                        <span className='text-[14px] mt-2 block'>
                            Enfants Books là nhà phát hành sách thiếu nhi thuộc Công ty CPTM & XNK Ngọc Ánh – đơn vị hơn 20 năm kinh nghiệm trong ngành in ấn và là đối tác uy tín cung cấp học liệu, sách vở học sinh cho hơn 5000 khách hàng khắp 28 tỉnh thành phía Bắc Việt Nam Hệ thống sản phẩm Enfants Books
                        </span>
                    </div>
                    <div className='py-5 '>
                        <div className='pb-5 text-[20px] border-b-2 border-dashed'>
                            Thanh toán & vận chuyển
                        </div>
                        <div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Hướng dẫn đặt hàng</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Phương thức vận chuyển</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Chính sách bảo mật</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Khiếu nại và đổi trả</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>

                    </div>
                    <div className='py-5 '>
                        <div className='pb-5 text-[20px] border-b-2 border-dashed'>
                            Site Maps
                        </div>
                        <div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Time table</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>FAQ'S</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Blog large</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='flex ml-5 gap-2 text-[14px] cursor-pointer hover:bg-[#cccc] transition-all justify-end items-center p-5 border-b-1 border-dashed'>
                                <span>Members</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </div>
                    </div>
                    <div className='py-5 '>
                        <div className='pb-5 text-[20px] border-b-2 border-dashed'>

                            Instagram
                        </div>
                    </div>
                </div>


            </div>
            <div className='text-center leading-10 bg-amber-300'>
                Copyright 2023 ©
            </div>

        </div>
    )
}

export default Footer