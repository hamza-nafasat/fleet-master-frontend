import React, { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

const Dropdown = ({
  label,
  options,
  defaultText = "Select",
  onSelect,
  icon,
  height,
  overflow,
  color = "#11111199",
  bg = "bg-[#ffffff]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const selectHander = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex flex-col gap-2 ">
      {label && (
        <label
          className="text-sm md:text-base font-[600]"
          style={{ color: color }} // Apply custom text color to label
        >
          {label}
        </label>
      )}
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className="w-[140px] bg-transparent flex items-center justify-between rounded-[12px] h-[40px] md:h-[45px] p-4 text-sm md:text-base"
          style={{
            border: `1px solid ${color}`, // Apply custom border color
            color: color, // Apply custom text color to button
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2" style={{ color: color }}>
            {icon && icon}
            <span className="text-sm">
              {selected ? selected.option : defaultText}
            </span>
          </div>
          <div
            className={`transition-all duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <TiArrowSortedDown style={{ color: color }} />{" "}
            {/* Custom text color for the arrow */}
          </div>
        </button>
        {isOpen && (
          <ul
            className={`absolute z-10 w-full ${
              height ? `h-[${height}]` : "h-auto"
            } 
            ${overflow ? `overflow-${overflow}` : "overflow-hidden"}
            rounded-md cursor-pointer border-y mt-1 border-[1px]`}
            style={{ borderColor: color }} // Apply custom border color to dropdown list
          >
            {options.map((option) => (
              <li
                className={`py-2 px-4 border-b text-xs ${bg} hover:bg-[#00000010]`}
                style={{
                  color: color, // Apply custom dropdown text color
                  borderColor: color, // Apply custom border color to dropdown items
                }}
                key={option.value}
                onClick={() => selectHander(option)}
              >
                {option.option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
