'use client';

import ButtonComponent from '@/components/ButtonComponent';
import {
  faEnvelopeOpenText,
  faHouseChimney,
  faMessage,
  faPaperPlane,
  faPhone,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Form, Input } from 'antd';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const contactChannels = [
  {
    icon: faPhone,
    title: 'Hotline chăm sóc phụ huynh',
    value: '+84 971 833 093',
    description: 'Gọi ngay để nhận tư vấn chọn sách, đặt combo hoặc hỗ trợ đơn hàng.',
    href: 'tel:+84971833093',
    accent: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  },
  {
    icon: faMessage,
    title: 'Messenger &amp; Zalo',
    value: '@enfantsbooks',
    description: 'Nhắn tin bất cứ lúc nào để được phản hồi trong vòng 1 giờ làm việc.',
    href: 'https://m.me/104988175154682',
    accent: 'bg-sky-100 text-sky-600 border-sky-200',
  },
  {
    icon: faEnvelopeOpenText,
    title: 'Email đối tác &amp; trường học',
    value: 'hello@enfantsbooks.vn',
    description: 'Hợp tác chương trình đọc sách, đặt quà tặng theo yêu cầu và xuất hoá đơn.',
    href: 'mailto:hello@enfantsbooks.vn',
    accent: 'bg-amber-100 text-amber-600 border-amber-200',
  },
];

const visitingHours = [
  { label: 'Thứ 2 - Thứ 6', value: '08:30 - 19:00' },
  { label: 'Thứ 7', value: '09:00 - 18:00' },
  { label: 'Chủ nhật', value: '09:00 - 16:00' },
];

const ContactPage = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const breadcrumbItems = useMemo(
    () => [
      {
        title: <Link href="/">Trang chủ</Link>,
      },
      {
        title: 'Liên hệ',
      },
    ],
    [],
  );

  const handleSubmit = (values: { name: string; email: string; message: string }) => {
    setSubmitting(true);
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert(`Cảm ơn ${values.name}! Chúng tôi sẽ liên hệ với bạn qua ${values.email}.`);
      form.resetFields();
      setSubmitting(false);
    }, 900);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-rose-50">
      <div className="pointer-events-none absolute inset-x-0 top-[-40%] h-[520px] bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.4),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-16 px-6 pb-24 pt-28 md:px-12">
        <section className="relative overflow-hidden rounded-[36px] border border-white/40 bg-white/80 p-10 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/70 via-transparent to-rose-100/60" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-6">
              <Breadcrumb items={breadcrumbItems} />
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  Kết nối với Enfants Books
                </h1>
                <p className="text-lg text-slate-600">
                  Đội ngũ Enfants luôn sẵn sàng đồng hành cùng gia đình và đối tác trong mọi hành trình đọc. Chúng tôi yêu thích được lắng nghe câu chuyện của bạn.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100/60 bg-white/70 p-4 shadow-inner">
                  <div className="text-xs uppercase tracking-[0.4em] text-sky-400">Phụ huynh &amp; bé</div>
                  <p className="mt-2 text-base font-semibold text-slate-800">Tư vấn chọn sách, combo hoạt động</p>
                </div>
                <div className="rounded-2xl border border-slate-100/60 bg-white/70 p-4 shadow-inner">
                  <div className="text-xs uppercase tracking-[0.4em] text-rose-400">Trường học &amp; doanh nghiệp</div>
                  <p className="mt-2 text-base font-semibold text-slate-800">Thiết kế chương trình đọc, workshop</p>
                </div>
              </div>
              <ButtonComponent
                type="primary"
                content={
                  <span className="flex items-center gap-2 text-base">
                    Đặt lịch tư vấn trực tuyến
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </span>
                }
              />
            </div>
            <div className="relative flex-1 rounded-3xl border border-white/50 bg-white/70 p-6 text-slate-600 shadow-lg">
              <div className="absolute -top-10 right-6 hidden h-24 w-24 rounded-full bg-gradient-to-br from-rose-300/60 via-transparent to-transparent blur-3xl md:block" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Tại showroom Enfants</h2>
                    <p className="text-sm text-slate-500">112 Trung Hoà, Cầu Giấy, Hà Nội</p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                  {visitingHours.map((slot) => (
                    <div key={slot.label} className="rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-inner">
                      <div className="text-xs uppercase tracking-[0.35em] text-slate-400">{slot.label}</div>
                      <div className="mt-2 text-base font-medium text-slate-700">{slot.value}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-100/60 bg-gradient-to-br from-slate-50 via-white to-sky-50/80 p-4 text-sm text-slate-500 shadow-inner">
                  <FontAwesomeIcon icon={faHouseChimney} className="mr-2 text-sky-400" />
                  Đặt lịch trước để tham gia góc đọc thử nghiệm và hoạt động trải nghiệm cuối tuần.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {contactChannels.map((channel) => (
            <Link
              key={channel.title}
              href={channel.href}
              className={`group relative flex flex-col gap-4 overflow-hidden rounded-[28px] border border-white/50 bg-white/80 p-8 text-slate-600 shadow-[0_25px_60px_-35px_rgba(14,116,144,0.35)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-30px_rgba(79,70,229,0.35)]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className={`relative inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${channel.accent}`}>
                <FontAwesomeIcon icon={channel.icon} />
                Liên hệ nhanh
              </div>
              <div className="relative space-y-2">
                <h3 className="text-2xl font-semibold text-slate-900">{channel.title}</h3>
                <p className="text-sm text-slate-500">{channel.description}</p>
              </div>
              <div className="relative text-lg font-semibold text-slate-900">{channel.value}</div>
              <div className="relative flex items-center gap-2 text-sm font-medium text-sky-600">
                Bắt đầu trò chuyện
                <FontAwesomeIcon icon={faPaperPlane} className="text-[12px]" />
              </div>
            </Link>
          ))}
        </section>

        <section className="grid gap-10 rounded-[36px] border border-white/50 bg-white/90 p-10 shadow-[0_25px_70px_-35px_rgba(30,64,175,0.25)] lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-medium text-emerald-600">
                <FontAwesomeIcon icon={faPaperPlane} />
                Gửi lời nhắn cho chúng tôi
              </span>
              <h2 className="text-3xl font-semibold text-slate-900">Chia sẻ nhu cầu của bạn</h2>
              <p className="text-slate-500">
                Điền thông tin để chúng tôi có thể chuẩn bị đề xuất phù hợp nhất. Bạn có thể chọn hình thức gặp trực tuyến hoặc tại showroom.
              </p>
            </div>
            <Form
              form={form}
              layout="vertical"
              className="grid gap-4"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Họ và tên"
                name="name"
                className="mb-2"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input size="large" placeholder="Tên phụ huynh hoặc đại diện" className="rounded-2xl border-slate-200 px-4 py-3" />
              </Form.Item>
              <Form.Item
                label="Email liên hệ"
                name="email"
                className="mb-2"
                rules={[{ required: true, type: 'email', message: 'Email chưa hợp lệ' }]}
              >
                <Input size="large" placeholder="you@example.com" className="rounded-2xl border-slate-200 px-4 py-3" />
              </Form.Item>
              <Form.Item label="Nhu cầu của bạn" name="message" className="mb-2">
                <Input.TextArea
                  placeholder="Chia sẻ những điều bạn mong muốn, ví dụ: combo theo độ tuổi, tổ chức workshop, quà tặng doanh nghiệp..."
                  className="rounded-2xl border-slate-200 px-4 py-3"
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </Form.Item>
              <div className="pt-2">
                <ButtonComponent
                  type={submitting ? 'disable' : 'primary'}
                  content={
                    <span className="flex items-center gap-2 text-base">
                      {submitting ? 'Đang gửi...' : 'Gửi thông tin cho Enfants'}
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                  }
                />
              </div>
            </Form>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-gradient-to-br from-white via-white/40 to-sky-50/70 p-6 text-slate-600 shadow-[0_25px_60px_-35px_rgba(14,116,144,0.3)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <FontAwesomeIcon icon={faEnvelopeOpenText} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Cần hỗ trợ khẩn?</h3>
                  <p className="text-sm text-slate-500">Để lại email hoặc gọi hotline để nhận phản hồi trong 30 phút.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-amber-200/70 bg-white/70 p-4 text-sm text-amber-600 shadow-inner">
                hello@enfantsbooks.vn
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between rounded-3xl border border-white/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-100 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.55)]">
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-sky-300">Bản đồ</div>
                <h3 className="mt-2 text-2xl font-semibold text-white">Hẹn gặp tại Enfants Hub</h3>
                <p className="mt-3 text-sm text-slate-300">
                  Chúng tôi đang hoàn thiện trải nghiệm thực tế ảo cho showroom. Trong lúc chờ đợi, bạn có thể xem lịch sự kiện và hoạt động cuối tuần trên fanpage.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1">Workshop cuối tuần</span>
                <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1">Không gian đọc thử</span>
                <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1">Cà phê dành cho phụ huynh</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
