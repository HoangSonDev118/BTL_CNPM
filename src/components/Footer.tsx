"use client";

import Link from "next/link";
import { useState } from "react";
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
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-[#f1f1f1] text-[#555] mt-10">
      {/* BLOCK 1: Đăng ký nhận quà */}
      <section className="bg-[#7ad3df] text-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center gap-4">
          <h3 className="text-xl md:text-2xl font-bold whitespace-nowrap">
            Đăng Ký Nhận Quà
          </h3>

          <form
            className="flex-1 w-full md:w-auto"
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
          >
            <div className="flex items-stretch bg-white rounded-full overflow-hidden shadow-sm max-w-[560px] mx-auto md:mx-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                className="flex-1 px-5 py-3 text-[#333] outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#f05a5a] hover:opacity-90 transition font-semibold"
              >
                ĐĂNG KÝ
              </button>
            </div>
          </form>

          <div className="flex items-center gap-3 text-white font-bold">
            <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/25">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <span className="text-lg md:text-xl">0912345678</span>
          </div>
        </div>
        <div className="candy-stripe h-[6px] w-full" />
      </section>

      {/* BLOCK 2: 4 icon */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoPill
          icon={faLocationDot}
          title="Địa chỉ"
          lines={["Nguyễn Xiển, Hoàng Mai, Hà Nội"]}
        />
        <InfoPill
          icon={faClock}
          title="Giờ làm việc"
          lines={["Thứ 2 - Thứ 7", "9h00 - 19h00"]}
        />
        <InfoPill
          icon={faPhone}
          title="Liên hệ"
          lines={["0912345678", "ndt06042004@gmail.com"]}
        />
        <div className="flex items-start gap-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#96C8DD] text-white flex-none">
            <FontAwesomeIcon icon={faShareNodes} />
          </span>
          <div>
            <h4 className="font-bold text-[#6b6b6b] mb-1">Kết nối</h4>
            <div className="flex items-center gap-3 text-lg">
              <Social href="#" icon={faGlobe} color="#0284c7" />
              <Social href="#" icon={faCameraRetro} color="#ec4899" />
              <Social href="#" icon={faPlay} color="#ef4444" />
              <Social href="#" icon={faPaperPlane} color="#22c55e" />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 3: About + Links + Instagram */}
      <section className="bg-[#eee]">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="/logos/logo.svg" alt="logo" className="w-10 h-10" />
              <div className="text-[#e85757] font-extrabold text-xl">
                CRABIT <span className="text-[#6b6b6b] font-bold">kidbooks</span>
              </div>
            </div>
            <p className="text-sm leading-6">
              Crabit Kidbooks là nhà phát hành sách thiếu nhi thuộc Công ty
              CPTM & XNK Ngọc Ánh – đơn vị hơn 20 năm kinh nghiệm trong ngành
              in ấn và là đối tác uy tín cung cấp học liệu, sách vở học sinh
              cho hơn 5000 khách hàng khắp 28 tỉnh thành phía Bắc Việt Nam.
            </p>
          </div>

          <FooterCol
            title="Thanh Toán & Vận Chuyển"
            links={[
              { href: "/huong-dan-dat-hang", label: "Hướng dẫn đặt hàng" },
              { href: "/phuong-thuc-van-chuyen", label: "Phương thức vận chuyển" },
              { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
              { href: "/khieu-nai-doi-tra", label: "Khiếu nại và đổi trả" },
            ]}
          />

          <FooterCol
            title="Site Maps"
            links={[
              { href: "/time-table", label: "Time Table" },
              { href: "/faqs", label: "FAQ'S" },
              { href: "/blog", label: "Blog Large" },
              { href: "/members", label: "Members" },
            ]}
          />

          <div>
            <h4 className="footer-head">Instagram</h4>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <a key={i} href="#" className="block">
                  <img
                    src={`/images/insta/${i + 1}.jpg`}
                    alt={`insta-${i + 1}`}
                    className="w-full aspect-square object-cover rounded-[3px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4: Copyright */}
      <section className="bg-[#f05a5a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 text-center text-sm">
          Copyright Crabit © 2018. All Rights Reserved
        </div>
      </section>
    </footer>
  );
}

function InfoPill({
  icon,
  title,
  lines,
}: {
  icon: IconDefinition;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#96C8DD] text-white flex-none">
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <h4 className="font-bold text-[#6b6b6b] mb-1">{title}</h4>
        {lines.map((l, idx) => (
          <p key={idx} className="text-sm leading-6 text-[#666]">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="footer-head">{title}</h4>
      <ul className="space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-[#96C8DD] transition">
              {l.label}
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
}: {
  href: string;
  icon: IconDefinition;
  color: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-[#ddd] hover:opacity-85 transition"
      style={{ color }}
      aria-label="social"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
}
