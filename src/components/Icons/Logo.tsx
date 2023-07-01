export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : undefined}
    >
      <g id="Group 9">
        <g id="Rectangle Copy 3">
          <path
            id="Mask"
            d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
            fill="#7C5DFA"
          />
          <mask
            id="mask0_0_1479"
            /*style="mask-type:luminance"*/
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="72"
            height="72"
          >
            <path
              id="Mask_2"
              d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_0_1479)">
            <path
              id="Rectangle Copy 3_2"
              d="M72 36.3496H20C8.95431 36.3496 0 45.3039 0 56.3496V88.3496C0 99.3953 8.95431 108.35 20 108.35H72V36.3496Z"
              fill="#9277FF"
            />
          </g>
        </g>
        <path
          id="Combined Shape"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M29.486 23.0003L36 35.8995L42.514 23.0003C46.9652 25.3092 50 29.9105 50 35.21C50 42.8261 43.732 49.0002 36 49.0002C28.268 49.0002 22 42.8261 22 35.21C22 29.9105 25.0348 25.3092 29.486 23.0003Z"
          fill="white"
        />
      </g>
    </svg>
    /*<svg xmlns="http://www.w3.org/2000/svg" width="28" height="26">
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
      />
    </svg>*/
  );
}
