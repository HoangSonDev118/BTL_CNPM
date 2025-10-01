"use clinet"

import ButtonComponent from "@/components/ButtonComponent";
import ImageComponet from "@/components/ImageComponent";
import { Breadcrumb, Carousel, Image, InputNumber, Rate } from "antd";
import React from "react";
import type { InputNumberProps } from 'antd';

const { PreviewGroup } = Image;

// const onChange: InputNumberProps['onChange'] = (value) => {
//   console.log('changed', value);
// };



const Page = () => {
  return (
    <div>
      <section className="text-[white] flex flex-col gap-5 justify-center items-center w-full h-35 m-auto bg-[url('/assets/bg5.png')] bg-[#9ac9db] bg-bottom bg-repeat-x">
        <div className="text-2xl">
          Thỏ con tương tác, sáng tạo - Bộ sách tương tác
        </div>
        <Breadcrumb
          items={[
            { title: <a href="/">Home</a> },
            { title: <a href="">Danh mục sách</a> },
            { title: <a href="">Thỏ con tương tác, sáng tạo - Bộ sách tương tác</a> },
          ]}
        />
      </section>

      <section className="shadow-2xl rounded-[5px] max-w-[1200px] m-auto p-4 mt-10">
        <div className="flex m-auto gap-10">
          <div className="flex-3">
            <div>
              <Image
                width={'100%'}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />

            </div>
            <div className="max-w-[650px] m-auto mt-9">

              <Carousel infinite slidesToShow={5} dots={false}>
                <div className="px-3">
                  <Image
                    width={'100%'}
                    src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
                  />
                </div>
                <div className="px-3">
                  <Image
                    width={'100%'}
                    src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
                  />
                </div>
                <div className="px-3">
                  <Image
                    width={'100%'}
                    src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
                  />
                </div>
                <div className="px-3">
                  <Image
                    width={'100%'}
                    src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
                  />
                </div>
                <div className="px-3">
                  <Image
                    width={'100%'}
                    src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
                  />
                </div>
                <div className="px-3">
                  <Image
                    width={'100%'}
                    src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
                  />
                </div>
              </Carousel>
            </div>
            {/* <div className="flex gap-5 overflow-x-auto max-w-[650px] bg-[green] w-full">
              <Image
                width={600}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />
              <Image
                width={600}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />
              <Image
                width={600}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />
              <Image
                width={600}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />
              <Image
                width={100}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />
              <Image
                width={100}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />
              <Image
                width={100}
                src="https://pos.nvncdn.com/5679e9-27451/ps/20220110_isNpjbqQ9BiTGZ0NAO8UXMRA.png?v=1673624042"
              />

            </div> */}
            {/* <PreviewGroup>
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
              />
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp"
              />
            </PreviewGroup> */}
          </div>
          <div className="flex-2">
            <h1 className="text-2xl">Thỏ con tương tác, sáng tạo - Bộ sách tương tác</h1>
            <div className='flex items-end gap-3 '>
              <h1 className='text-[20px] text-[#a4a4a4] line-through'>100.000 đ</h1>
              <h1 className='text-[25px] text-[#FF6A00]'>640.000 đ</h1>
            </div>
            <Rate defaultValue={2} />
            <div>
              <span>Tình trạng: </span>
              <span>Còn hàng</span>
            </div>
            <div>
              <h1>Thông tin</h1>

              <p> - Công ty phát hành: Công ty Cổ phần thương mại và Xuất nhập khẩu Ngọc Ánh - Việt Nam</p>

              <p> - Nhà phát hành: Crabit Kidbooks</p>

              <p> - Nhà xuất bản: NXB Hà Nội</p>

              <p> - Tác giả: Jörg Mühle</p>

              <p> - Minh họa: Jörg Mühle</p>

              <p> - Dịch giả: Lam</p>

              <p> - Loại bìa: Sách bìa cứng, các trang bồi cứng</p>

              <p> - Kích thước: 17 x 17 cm</p>

              <p> - Số trang: 20 trang</p>

              <p> - Độ tuổi: 6 tháng tuổi +</p>

              <p> - Ngày xuất bản: 1/2021</p>

              <p> - Gồm 3 cuốn: Thỏ con đến giờ ngủ rồi; Thỏ con ngại gì đi tắm; Thỏ con dũng cảm nín khóc"</p>
            </div>
            <div>
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </div>

            <div className="flex gap-10">
              <ButtonComponent content="Thêm vào giỏ hàng" type="secondary" />

              <ButtonComponent content="Mua ngay" type="primary" />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
