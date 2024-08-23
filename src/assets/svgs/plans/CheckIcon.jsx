import React from 'react'

const CheckIcon = ({ width }) => {
const iconWidth = width !== undefined ? width : 23;
  return (
    <>
      <svg
        width={iconWidth}
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.769231"
          y="0.769231"
          width="21.3415"
          height="20.4615"
          rx="1.53846"
          stroke="white"
          strokeWidth="1.53846"
        />
        <path
          d="M6.15991 11.2708L9.86184 14.9727L17.2657 7.04004"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}

export default CheckIcon
