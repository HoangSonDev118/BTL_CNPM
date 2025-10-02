import Link from "next/link";
import React from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "antd";
import ButtonComponent from "./ButtonComponent";
import InputComponents from "./InputComponents";

const LoginForm = () => {
  return (
    <div
      className='
        relative
        w-full max-w-[492px]
        mx-auto my-10
        border-2 rounded-[5px] border-[#96C8DD]
        p-6'
    >
      <div
        className="text-[20px] transition-all
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
          <InputComponents type='text' placeholder='Email/SĐT' />
          <InputComponents type='password' placeholder='Mật khẩu' />
        </div>

        <div className='text-[13px] flex justify-between'>
          <span>Hãy ghi nhớ tôi <Checkbox /></span>
          <Link
            href='/forgot-password'
            className='italic underline text-[#96C8DD] cursor-pointer hover:text-[#689aaf] transition-all'
          >Quên mật khẩu ?</Link>
        </div>
        <div className='text-[13px]'>
          <span>Bạn chưa có tài khoản ?</span>
          <Link
            href='/register'
            className='italic underline text-[#96C8DD] ml-3 cursor-pointer hover:text-[#689aaf] transition-all'
          >Đăng ký</Link>
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

export default LoginForm;
