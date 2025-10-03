import { Breadcrumb } from 'antd'
import React from 'react'

const page = () => {
  return (
    <div>
      <section className="text-[white] flex flex-col gap-5 justify-center items-center w-full h-35 m-auto bg-[url('/assets/bg5.png')] bg-[#9ac9db] bg-bottom bg-repeat-x">
        <div className='text-2xl'>Liên hệ</div>
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href="">Liên hệ</a>,
            },
          ]}
        />
      </section>

      <section>
        <h1>Liên hệ với chúng tôi</h1>
        <p>Enfants Books chúng tôi rất hân hạnh chào đón bạn, hãy liên hệ với chúng tôi đế hợp tác cũng như có được nhiều ưu đãi hấp dẫn !</p>
      </section>

    </div>
  )
}

export default page