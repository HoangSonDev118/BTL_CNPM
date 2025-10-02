import React from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonComponent from "./ButtonComponent";
import InputComponents from "./InputComponents";

const RecoverPasswordForm = () => {
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
          <h1 className='text-3xl text-[#96C8DD] text-center mb-2.5'>Khôi phục mật khẩu</h1>
          <h4 className='text-[#919191] text-[12px] text-center'>Nhập mật khẩu mới để khôi phục tài khoản</h4>
        </div>

        <div className='flex flex-col gap-5'>
          <InputComponents type='password' placeholder='Mật khẩu mới' />
          <InputComponents type='password' placeholder='Xác nhận mật khẩu' />
        </div>

        <ButtonComponent content="Xác nhận" type='primary' />

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

export default RecoverPasswordForm;
