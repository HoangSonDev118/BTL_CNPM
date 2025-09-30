import React, { ReactNode } from "react";

type ButtonProps = {
    content: ReactNode;   // 👈 đổi từ string sang ReactNode
    type: "primary" | "secondary" | "disable";
    onClick?: () => void 
};

const ButtonComponent = ({ content, type, onClick }: ButtonProps) => {
    const baseStyle =
        "w-full h-12 rounded-[5px]  transition-all flex items-center justify-center gap-2";

    const styles =
        type === "primary"
            ? "bg-[#96C8DD] text-white hover:bg-[#689aaf] cursor-pointer"
        : type === "disable"
            ?   "bg-[#c7c7c7] text-white cursor-not-allowed"
            : "border-2 border-[#CDC1FF] hover:border-[#96C8DD] hover:bg-[#f0f0f0] cursor-pointer";

    return <button onClick={onClick} className={`${baseStyle} ${styles}`}>{content}</button>;
};

export default ButtonComponent;
