import * as React from "react"

const SvgComponent = ({fill="#fff"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >
    <path
      fill="black"
      d="M51.9 19.9C51.9 30.9 32 64 32 64S12.1 30.9 12.1 19.9 21 0 32 0s19.9 8.9 19.9 19.9z"
    />
    <circle
      cx={32}
      cy={19.9}
      r={12.3}
      fill={fill}
      transform="rotate(-76.714 32.003 19.925)"
    />
  </svg>
)

export default SvgComponent
