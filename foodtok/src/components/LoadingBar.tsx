import ctl from '@netlify/classnames-template-literals';
import * as PropTypes from 'prop-types';

type prop = JSX.IntrinsicElements['div'] & {
  rounded?: boolean;
};

const LoadingBar = ({ rounded, className, children }: prop) => (
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
      ${className}
  `)}
  >
    {children}
  </div>
);

LoadingBar.propTypes = {
  rounded: PropTypes.bool,
};

LoadingBar.defaultProps = {
  rounded: false,
};

export default LoadingBar;
