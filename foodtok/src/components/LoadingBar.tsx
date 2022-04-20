import ctl from "@netlify/classnames-template-literals";

const LoadingBar = ({ rounded = false }) => (
  <div
    className={ctl(`
      bg-gray-400 w-full h-full
      relative overflow-hidden
      after:absolute after:inset-0
      after:bg-gradient-to-r
      after:from-transparent
      after:via-white/40
      after:to-transparent
      after:animate-[slideX_1.5s_ease-out_infinite]
      ${rounded ? 'rounded-lg' : ' '}
  `)}
  />
);

export default LoadingBar;
