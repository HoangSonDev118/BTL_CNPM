import CardComponent from '@/components/CardComponent'
import { faFill, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'antd'
import React from 'react'

const page = () => {
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    return (
        <div>
            <section className='w-[1200px] m-auto  flex'>
                <div className='flex-1 bg-amber-950 sticky top-[80px] h-[1000px]'>
                    <div className='flex flex-col text-[20px]'>

                        <div className='pb-10'>Danh mục tổng hợp</div>
                        <div className='flex flex-col gap-5 text-[15px]'>
                            <span>Sách truyện thiếu nhi</span>
                            <span>Truyện tranh</span>
                            <span>Flashcards</span>
                            <span>Vở Wipe clean</span>
                            <span>Vở học từ mới cho bé</span>
                            <span>Hộp quà tặng cho bé</span>
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
                                defaultValue="Mới nhất"
                                placement={"bottomRight"}
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
                    <div className='bg-[violet]'>aaa</div>
                    <div className='bg-[#76f4ff] grid grid-cols-4 gap-2'>
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


                </div>
            </section>

        </div>
    )
}

export default page