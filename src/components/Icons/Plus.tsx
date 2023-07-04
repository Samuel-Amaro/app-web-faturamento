export default function Plus({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : undefined}
    >
      <g id="Group 3">
        <circle id="Oval" cx="16" cy="16" r="16" fill="white" />
        <path
          id="+"
          d="M17.3131 21.0234V17.3136H21.0229V14.7333H17.3131V11.0234H14.7328V14.7333H11.0229V17.3136H14.7328V21.0234H17.3131Z"
          fill="#7C5DFA"
        />
      </g>
    </svg>
  );
}

/* <svg
      width="11"
      height="11"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : undefined}
    >
      <path
        d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
        fill="#7C5DFA"
        fillRule="nonzero"
      />
    </svg>*/
