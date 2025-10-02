// src/app/page.tsx
import CardComponent from "@/components/CardComponent";
import { Carousel } from "antd";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <nav className='max-w-[1200px] flex justify-center gap-10 items-center my-5'>
        <span>Trang chủ</span>
        <span>Danh mục sách</span>
        <div className='mx-10'>
          <img src="/logos/logo.svg" className='w-12' />
        </div>
        <span>Combo ưu đãi</span>
        <span>Liên hệ</span>
      </nav>
      <section className="my-5">
        <Carousel draggable swipeToSlide autoplay autoplaySpeed={5000}>
          <div>
            <img
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250523_CpU3AO5i.gif?v=1747974773"
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div>
            <img
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250520_u0tk6AVL.gif?v=1747711112"
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div>
            <img
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250107_HRZhQmSo.gif?v=1736241946"
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div>
            <img
              src="https://pos.nvncdn.com/5679e9-27451/bn/20240717_vdHNhklV.gif?v=1721205944"
              alt=""
              className="w-full object-cover"
            />
          </div>
        </Carousel>
      </section>
      <div className="text-center">
        <h1 className="my-8 text-5xl text-[#525252]">ENFANTS BOOKS</h1>
        <h2 className="my-8 text-3xl text-[#787878]">
          Nhà phát hành sách đồng hành cùng giai đoạn phát triển của trẻ
        </h2>
      </div>
      <section className="my-8 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </section>
    </div>
  );
}
