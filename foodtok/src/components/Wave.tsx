import ctl from '@netlify/classnames-template-literals';

const Wave = ({ className }: { className?: string }) => (
  <div
    className={ctl(`
      absolute left-1/2 min-h-[300vw] min-w-[300vw]
    bg-white/10
      bottom-[50vh]
      rounded-[47%]
      animate-wave ease-out
      ${className}
    `)}
  />
);

export default Wave;
