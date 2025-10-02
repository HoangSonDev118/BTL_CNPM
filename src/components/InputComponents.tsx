'use client'

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

type InputProps = {
    placeholder: string;
    type?: "text" | "password"; // cho phép optional, default = text
};

const InputComponents = ({ placeholder, type = "text" }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="inputGroup relative z-[99]">
            <input
                type={inputType}
                autoComplete="off"
                required
                style={{
                    padding: type === "password" ? "10px 60px 10px 15px" : "10px 15px",
                }}
                className="rounded-[5px] text-[15px] border-2 w-full border-[#c1c1c1] outline-0
                bg-transparent 
                peer focus:border-[#96C8DD] hover:border-[#96C8DD]
                z-[999]"
            />

            {type === "password" && (
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer p-1 w-[35px] h-[35px]
            text-[20px] transition-all
            flex justify-center items-center
            absolute top-1/2 right-2.5 transform -translate-y-1/2
            rounded-[5px]
            text-[#c1c1c1]
            hover:bg-[#ededed]"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
            )}

            <div
                className="transition-all absolute top-1/2 left-[5px] transform -translate-y-1/2 px-[10px]
            text-[15px] 
            text-[#c1c1c1]
            bg-[white]
            z-[-99]

            peer-focus:-translate-y-[35px] 
            peer-focus:translate-x-[8px] 
            peer-focus:text-[#96C8DD] 
            peer-focus:text-[16px] 
            peer-focus:z-[999]

            peer-valid:-translate-y-[35px] 
            peer-valid:translate-x-[8px] 
            peer-valid:text-[16px] 
            peer-valid:z-[1]

            peer-hover:text-[#96C8DD]"
            >
                {placeholder}
            </div>
        </div>
    );
};

export default InputComponents;
