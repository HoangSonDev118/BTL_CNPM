import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCoffee } from '@fortawesome/free-solid-svg-icons';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import OTPForm from '@/components/OTPForm';
import RecoverPasswordForm from '@/components/RecoverPasswordForm';
import { Carousel } from 'antd';
import CardComponent from '@/components/CardComponent';

export default function Home() {


  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


  return (
    <div>
      {/* <LoginForm/> */}
      {/* <RegisterForm/> */}
      {/* <ForgotPasswordForm/> */}
      {/* <OTPForm/> */}
      {/* <RecoverPasswordForm/> */}


      <nav className='max-w-[1200px] flex justify-center gap-10 items-center my-5'>
        <span>Trang chủ</span>
        <span>Danh mục sách</span>
        <div className='mx-10'>
          <img src="/logos/logo.png" className='w-12' />
        </div>
        <span>Đang ưu đãi</span>
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
      <div className='text-center'>
        <h1 className='my-8 text-5xl text-center text-[#525252]'>ENFANTS BOOKS</h1>
        <h2 className='my-8 text-3xl text-[#787878]'>Nhà phát hành sách đồng hành cùng giai đoạn phát triển của trẻ</h2>
      </div>
      <section >
      </section>


      <section className='grid grid-cols-5 gap-5'>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
      </section>




    </div>
  );
}
