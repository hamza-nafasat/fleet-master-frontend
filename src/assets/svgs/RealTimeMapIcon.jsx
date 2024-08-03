import React from 'react'

const RealTimeMapIcon = ({ isActivePage }) => {
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_145_8387)">
          <path
            d="M0.833374 5.00002V18.3334L6.66671 15L13.3334 18.3334L19.1667 15V1.66669L13.3334 5.00002L6.66671 1.66669L0.833374 5.00002Z"
            stroke={isActivePage === 'real-time-map' ? '#000' : '#fff'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66663 1.66669V15"
            stroke={isActivePage === 'real-time-map' ? '#000' : '#fff'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3334 5V18.3333"
            stroke={isActivePage === 'real-time-map' ? '#000' : '#fff'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_145_8387">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}

export default RealTimeMapIcon
