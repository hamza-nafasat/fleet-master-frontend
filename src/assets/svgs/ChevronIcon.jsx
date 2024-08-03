import React from 'react'

const ChevronIcon = ({ isActivePage }) => {
  const pages = ['home', 'dashboard', 'reports', 'settings']
  const active = pages.includes(isActivePage)
  return (
    <>
      <svg style={{mixBlendMode: isActivePage ? 'difference': ''}}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke={active ? '#000' : '#fff'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )
}

export default ChevronIcon
