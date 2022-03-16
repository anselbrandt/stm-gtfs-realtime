import * as React from "react";

const SvgComponent = (props: any) => (
  <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M21.02 25.516a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-.025 6.986a1.5 1.5 0 1 1-3-.001 1.5 1.5 0 0 1 3 0zm.013-20.993a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-.006 6.99a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        fill="currentColor"
      />
      <path
        d="M27 45v6l-5-2-5 2v-6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M13 47h-2c-.978 0-2-.982-2-2V7c0-1.018 1.022-2 2-2h34c.978 0 2 .982 2 2v38c0 1.018-1.022 2-2 2H31" />
        <path d="M9 41c0-1.215 1.043-2.114 2-2h34c1.085-.114 2-.952 2-2M14.1 6.074v31.868" />
      </g>
    </g>
  </svg>
);

export default SvgComponent;
