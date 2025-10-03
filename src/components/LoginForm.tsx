import React from 'react'

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Input } from 'antd';
import ButtonComponent from './ButtonComponent';
import InputComponents from './InputComponents';


const LoginForm = () => {
    return (
        <div className='
        fixed top-1/2 left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 
        w-[492px] h-auto border-2
        rounded-[5px] border-[#96C8DD] py-15' >
            <div
                className="cursor-pointer p-1 w-[35px] h-[35px]
                                    text-[20px] transition-all
                                    flex justify-center items-center
                                    absolute top-3.5 right-3.5
                                    rounded-[5px]
                                    text-[#c1c1c1]
                                    hover:bg-[#ededed]"
            >
                <FontAwesomeIcon icon={faTimes} />
            </div>

            <div className='flex colu flex-col items-stretch w-full px-20 gap-4'>

                <img src="/logos/logo.svg" className='w-15 m-auto' />
                <div className='mb-2'>
                    <h1 className='text-3xl text-[#96C8DD] text-center mb-2.5'>Đăng nhập</h1>
                    <h4 className='text-[#919191] text-[12px] text-center'>Để sử dụng nhiều tính năng hấp dẫn cho trải nhiệm mua sắm của bạn !</h4>
                </div>

                <div className='flex flex-col gap-5'>
                    {/* <Input placeholder="Basic usage" className='h-12' /> */}

                    <InputComponents type='text' placeholder='Email/SĐT' />
                    <InputComponents type='password' placeholder='Mật khẩu' />

                </div>

                <div className='text-[13px] flex justify-between'>
                    <span >Hãy ghi nhớ tôi <Checkbox /></span>
                    <span className='italic underline text-[#96C8DD] cursor-pointer hover:text-[#689aaf] transition-all'>Quên mật khẩu ?</span>
                </div>
                <div className='text-[13px]'>
                    <span>Bạn chưa có tài khoản ?</span>
                    <span className='italic underline text-[#96C8DD] ml-3 cursor-pointer hover:text-[#689aaf] transition-all'>Đăng ký</span>
                </div>


                <ButtonComponent content="Đăng nhập" type='primary' />

                <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-400">hoặc</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <ButtonComponent
                    type="secondary"
                    content={
                        <span className="flex items-center gap-2">
                            Hoặc đăng nhập với Google
                            <img src="/logos/pngegg.png" className="w-15" />
                        </span>
                    }
                />
                <ButtonComponent
                    type="secondary"
                    content={
                        <span className="flex items-center gap-2">
                            Hoặc đăng nhập với Facebook
                            <img src="/logos/facebook.png" className="w-7 float-right" />
                        </span>
                    }
                />
            </div>
        </div>
    )
}

export default LoginForm