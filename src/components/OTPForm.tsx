"use client";

import React, { useState } from 'react'
import ButtonComponent from './ButtonComponent'

import { Input } from "antd";
type OTPProps = React.ComponentProps<typeof Input.OTP>;

const OTPForm = () => {
    const [otp, setOtp] = useState("");

    const onChange: OTPProps["onChange"] = (text) => {
        console.log("onChange:", text);
        setOtp(text);
    };

    const onInput: OTPProps["onInput"] = (value) => {
        console.log("onInput:", value);
    };

    const sharedProps: OTPProps = {
        onChange,
        onInput,
        length: 6, // số ký tự OTP
    };
    return (
        <div className='
        fixed top-1/2 left-1/2 transform 
        -translate-x-1/2 -translate-y-1/2 
        w-[492px] h-auto border-2
        rounded-[5px] border-[#96C8DD] py-15' >
            {/* <FontAwesomeIcon icon={faTimes}
                className='size-[20px] cursor-pointer p-2 
                        text-2xl transition-all
                        hover:text-[#96C8DD] absolute top-2 right-2'/> */}

            <div className='flex colu flex-col items-stretch w-full px-20 gap-4'>

                <img src="/logos/logo.svg" className='w-15 m-auto' />
                <div className='mb-2'>
                    <h1 className='text-3xl text-[#96C8DD] text-center mb-2.5'>Xác nhận OTP</h1>
                    <h4 className='text-[#919191] text-[12px] text-center'>Nhập mã OTP vừa được gửi về máy bạn để khôi phục tài khoản</h4>
                </div>

                <div className='mb-2'>
                    {/* <Input placeholder="Basic usage" className='h-12' /> */}

                    {/* <InputComponents type='text' placeholder='Email/SĐT' /> */}
                    <Input.OTP
                        {...sharedProps}
                        formatter={(str) => str.toUpperCase()} // auto uppercase
                    />
                </div>

                <div className='text-[13px]'>
                    {/* <span>Bạn không  ?</span> */}
                    <span className='italic underline text-[#96C8DD] cursor-pointer hover:text-[#689aaf] transition-all'>Bạn không nhận được mã OTP ?</span>
                </div>


                <ButtonComponent


                    onClick={() => console.log(otp)}


                    content="Xác nhận" type='primary' />
                <ButtonComponent


                    onClick={() => console.log(otp)}
                    content="Gửi lại mã OTP" type='disable' />

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

export default OTPForm