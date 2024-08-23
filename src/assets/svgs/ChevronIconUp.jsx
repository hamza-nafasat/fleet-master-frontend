import React from 'react'

const ChevronIconUp = ({ isActivePage }) => {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(180deg)' }}
      >
        <path
          d="M4 6L8 10L12 6"
          stroke={isActivePage ? '#000' : '#fff'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </>
  )
}

export default ChevronIconUp
