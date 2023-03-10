import Link from "next/link";
import Image from "next/image";
import ModalLoader from "./ModalLoader"
import { useState } from 'react'
const buttons = [
  { name: "Get Started", href: "/login", backgroundColor: true },
  { name: "Demo", href: "", backgroundColor: false },
];

export const Landing = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 h-[34rem] sm:h-[39rem]">
      <Image
        src="https://images.unsplash.com/photo-1639322537138-5e513100b36e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
        alt=""
        width={1800}
        height={1800}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <svg
        viewBox="0 0 1097 845"
        aria-hidden="true"
        className="hidden transform-gpu blur-3xl sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:w-[68.5625rem]"
      >
        <path
          fill="url(#10724532-9d81-43d2-bb94-866e98dd6e42)"
          fillOpacity=".2"
          d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
        />
        <defs>
          <linearGradient
            id="10724532-9d81-43d2-bb94-866e98dd6e42"
            x1="1097.04"
            x2="-141.165"
            y1=".22"
            y2="363.075"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2C295D" />
            <stop offset={1} stopColor="#81254C" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1097 845"
        aria-hidden="true"
        className="absolute left-1/2 -top-52 -z-10 w-[68.5625rem] -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0"
      >
        <path
          fill="url(#8ddc7edb-8983-4cd7-bccb-79ad21097d70)"
          fillOpacity=".2"
          d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
        />
        <defs>
          <linearGradient
            id="8ddc7edb-8983-4cd7-bccb-79ad21097d70"
            x1="1097.04"
            x2="-141.165"
            y1=".22"
            y2="363.075"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#81254C" />
            <stop offset={1} stopColor="#FF4694" />
          </linearGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl tracking-wide font-bold tracking-tight text-white sm:text-6xl">
            Your work experience, <br />
            like you never imagined it
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none flex justify-left">
          <Link className="mr-3" href="/register" onClick={()=>{ setLoading(true) }} >
            <button 
              className="
                inline-flex
                items-center
                rounded-full
                px-10
                py-3
                text-sm
                font-medium
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2
                bg-teal
                hover:bg-teal-900
                focus:ring-teal-500
                text-white
                border-transparent
                w-50
                flex justify-center
                "
              type="button"
            >
              <p>Get Started</p>
            </button>
          </Link>
          {/* TODO: Poner link del video cuando lo acabemos */}
          <Link className="mr-3" href="/login" onClick={()=>{ setLoading(true) }}>
            <button
              className="
                inline-flex
                items-center
                rounded-full
                px-10
                py-3
                text-sm
                font-medium
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2
                border-transparent
                w-50
                flex justify-center
                border
                bg-white
                hover:bg-teal
                focus:ring=teal-900
                hover:text-white
                text-gray-700
                border-teal
                "
              type="button"
            >
              <p>Login</p>
            </button>
          </Link>
        </div>
      </div>
      <ModalLoader loading={loading} />
    </div>
    
  );
};
