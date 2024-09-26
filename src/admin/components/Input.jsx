import React from "react";

const Input = ({label, icon, ...rest}) => {
  return (
    <div className="relative">
      {label && <label className="text-sm md:text-base font-semibold text-[rgba(17,17,17,1)] mb-4 block">{label}</label>}
      <input {...rest} className="focus:outline-none w-full h-[60px] rounded-[14px] border px-4" />
      <div className="absolute right-[2%] top-[57%]">{icon}</div>
    </div>
  );
};

export default Input;
