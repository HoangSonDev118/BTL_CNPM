"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "../lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faPhone,
  faShareNodes,
  faGlobe,
  faCameraRetro,
  faPaperPlane,
  faPlay,
  faEnvelope,
  faChevronRight,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] text-[#555] mt-10">
      {/* BLOCK 1: Đăng ký nhận quà */}
      <section className="bg-gradient-to-r from-[#7ad3df] via-[#6bc5d1] to-[#5cb7c3] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-1">
                🎁 Đăng Ký Nhận Quà
              </h3>
              <p className="text-sm text-white/90">Nhận ưu đãi đặc biệt ngay hôm nay!</p>
            </div>

            <form
              className="flex-1 w-full lg:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <div className="flex items-stretch bg-white rounded-full overflow-hidden shadow-lg max-w-[560px] mx-auto lg:mx-0 transition-all hover:shadow-xl">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 text-[#333] outline-none text-sm md:text-base"
                />
                <button
                  type="submit"
                  className="px-5 md:px-7 py-3 md:py-4 bg-gradient-to-r from-[#f05a5a] to-[#e84a4a] hover:from-[#e84a4a] hover:to-[#d93a3a] transition-all font-semibold text-sm md:text-base whitespace-nowrap shadow-lg"
                >
                  ĐĂNG KÝ
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3 text-white font-bold bg-white/15 px-5 py-3 rounded-full backdrop-blur-sm">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/25">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span className="text-lg md:text-xl">0912345678</span>
            </div>
          </div>
        </div>
        <div className="candy-stripe h-[6px] w-full" />
      </section>

      {/* BLOCK 2: 4 icon - Với màu sắc */}
      <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoPill
          icon={faLocationDot}
          title="Địa chỉ"
          lines={["Nguyễn Xiển, Hoàng Mai, Hà Nội"]}
          color="#ef4444"
          gradient="from-red-500 to-red-600"
        />
        <InfoPill
          icon={faClock}
          title="Giờ làm việc"
          lines={["Thứ 2 - Thứ 7", "9h00 - 19h00"]}
          color="#0ea5e9"
          gradient="from-sky-500 to-blue-500"
        />
        <InfoPill
          icon={faEnvelope}
          title="Liên hệ"
          lines={["0912345678", "ndt06042004@gmail.com"]}
          color="#22c55e"
          gradient="from-green-500 to-emerald-500"
        />
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <span 
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white flex-none bg-gradient-to-br from-amber-500 to-orange-500"
            style={{ boxShadow: "0 8px 24px -8px #f59e0b" }}
          >
            <FontAwesomeIcon icon={faShareNodes} />
          </span>
          <div>
            <h4 className="font-bold text-[#2d3748] mb-2">Kết nối với chúng tôi</h4>
            <div className="flex items-center gap-2">
              <Social href="#" icon={faGlobe} color="#0284c7" bgColor="bg-sky-100" />
              <Social href="#" icon={faCameraRetro} color="#ec4899" bgColor="bg-pink-100" />
              <Social href="#" icon={faPlay} color="#ef4444" bgColor="bg-red-100" />
              <Social href="#" icon={faPaperPlane} color="#22c55e" bgColor="bg-green-100" />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 3: About + Links */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logos/logo.svg" alt="logo" className="w-12 h-12" />
              <div className="text-[#e85757] font-extrabold text-2xl">
                Enfants <span className="text-[#6b6b6b] font-bold">Books</span>
              </div>
            </div>
            <p className="text-sm leading-7 text-gray-600 mb-4">
              Enfants là nhà phát hành sách thiếu nhi thuộc Công ty 4TV – đơn vị hơn 20 năm kinh nghiệm trong ngành
              in ấn và là đối tác uy tín cung cấp học liệu, sách vở học sinh
              cho hơn 8 tỉ khách hàng khắp thế giới.
            </p>
            
            {/* Social Links lớn hơn */}
            <div className="flex items-center gap-3 mt-5">
              <SocialLarge href="#" icon={faGlobe} color="#0284c7" />
              <SocialLarge href="#" icon={faCameraRetro} color="#ec4899" />
              <SocialLarge href="#" icon={faPlay} color="#ef4444" />
              <SocialLarge href="#" icon={faPaperPlane} color="#22c55e" />
            </div>
          </div>

          <FooterCol
            title="Thanh Toán & Vận Chuyển"
            icon="💳"
            color="#0ea5e9"
            links={[
              { href: "/huong-dan-dat-hang", label: "Hướng dẫn đặt hàng" },
              { href: "/phuong-thuc-van-chuyen", label: "Phương thức vận chuyển" },
              { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
              { href: "/khieu-nai-doi-tra", label: "Khiếu nại và đổi trả" },
            ]}
          />

          <FooterCol
            title="Thông Tin Hữu Ích"
            icon="📚"
            color="#22c55e"
            links={[
              { href: "/time-table", label: "Lịch hoạt động" },
              { href: "/faqs", label: "Câu hỏi thường gặp" },
              { href: "/blog", label: "Blog & Tin tức" },
              { href: "/about", label: "Về chúng tôi" },
            ]}
          />
        </div>
      </section>

      {/* BLOCK 4: Copyright */}
      <section className="bg-gradient-to-r from-[#f05a5a] via-[#e84a4a] to-[#f05a5a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span>Copyright Enfants © 2025.</span>
            <span className="hidden md:inline">|</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:underline opacity-90 hover:opacity-100 transition">
              Chính sách bảo mật
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:underline opacity-90 hover:opacity-100 transition">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}

function InfoPill({
  icon,
  title,
  lines,
  color,
  gradient,
}: {
  icon: IconDefinition;
  title: string;
  lines: string[];
  color: string;
  gradient: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <span 
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white flex-none bg-gradient-to-br ${gradient}`}
        style={{ boxShadow: `0 8px 24px -8px ${color}` }}
      >
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <h4 className="font-bold text-[#2d3748] mb-1 text-[15px]">{title}</h4>
        {lines.map((l, idx) => (
          <p key={idx} className="text-sm leading-6 text-gray-600">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function FooterCol({
  title,
  icon,
  color,
  links,
}: {
  title: string;
  icon: string;
  color: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-lg font-bold mb-5" style={{ color }}>
        <span className="text-2xl">{icon}</span>
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link 
              href={l.href} 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#7ad3df] transition-colors group"
            >
              <FontAwesomeIcon 
                icon={faChevronRight} 
                className="text-xs opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" 
              />
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({
  href,
  icon,
  color,
  bgColor,
}: {
  href: string;
  icon: IconDefinition;
  color: string;
  bgColor: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex w-8 h-8 items-center justify-center rounded-lg ${bgColor} hover:scale-110 transition-all duration-200`}
      style={{ color }}
      aria-label="social"
    >
      <FontAwesomeIcon icon={icon} className="text-sm" />
    </a>
  );
}

function SocialLarge({
  href,
  icon,
  color,
}: {
  href: string;
  icon: IconDefinition;
  color: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-gray-100 hover:scale-110 hover:shadow-lg transition-all duration-200"
      style={{ color }}
      aria-label="social"
    >
      <FontAwesomeIcon icon={icon} className="text-lg" />
    </a>
  );
}