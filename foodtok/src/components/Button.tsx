import ctl from '@netlify/classnames-template-literals';
import * as PropTypes from 'prop-types';

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

interface Props extends ButtonProps {
  variance: 'filled' | 'outlined' | 'none';
}

/*
            before:absolute before:inset-0 before:w-full before:h-full before:bg-inherit before:rounded-[inherit] before:opacity-25 
            group-hover:before:opacity-50 hover:before:h-[calc(100%+0.75rem)] hover:before:w-[calc(100%+0.75rem)] hover:before:-left-1.5 hover:before:-top-1.5
            group-after:before:opacity-50 after:before:h-[calc(100%+0.75rem)] after:before:w-[calc(100%+0.75rem)] after:before:-left-1.5 after:before:-top-1.5
            group-focus:before:opacity-50 focus:before:h-[calc(100%+0.75rem)] focus:before:w-[calc(100%+0.75rem)] focus:before:-left-1.5 focus:before:-top-1.5 

*/
const Button = (props: Props): React.ReactElement<Props> => {
  if (props.variance === 'filled') {
    return (
      <button
        {...props}
        className={ctl(`
            relative
            inline-block
            prose dark:prose-invert
            py-2 px-3 rounded-lg
            font-bold text-lg
            group
    
            outline-none
            dark:hover:outline-slate-50/30 hover:outline-slate-900/30 hover:outline hover:outline-8 hover:outline-offset-0
            dark:focus:outline-slate-50/30 focus:outline-slate-900/30 focus:outline focus:outline-8 focus:outline-offset-0
            dark:active:outline-slate-50/30 active:outline-slate-900/30 active:outline active:outline-8 active:outline-offset-0

            shadow-md shadow-slate-600/50
            hover:shadow-sm focus:shadow-sm active:shadow-sm

            before:transition-all before:duration-150 before:ease-in
            translate-all duration-150 ease-in
            ${props.className}
            `)}
      >
        <p>{props?.children ? props.children : null}</p>
      </button>
    );
  }
  if (props.variance === 'none') {
    return (
      <button
        {...props}
        className={ctl(`
          relative
          inline-block
          prose dark:prose-invert
          py-2 px-3 rounded-lg
          font-bold text-lg

          outline-none

          shadow-md shadow-slate-600/50
          hover:shadow-sm focus:shadow-sm active:shadow-sm
          translate-all duration-150 ease-in
          ${props.className}

        `)}
      ></button>
    );
  }
  return (
    <button
      {...props}
      className={ctl(`
          relative
          inline-block
          prose dark:prose-invert
          py-2 px-3 rounded-lg
          font-bold text-lg 
          brightness-90
  
          outline-none
          dark:hover:outline-slate-50/30 hover:outline-slate-900/30 hover:outline hover:outline-8 hover:outline-offset-0
          dark:focus:outline-slate-50/30 focus:outline-slate-900/30 focus:outline focus:outline-8 focus:outline-offset-0
          dark:active:outline-slate-50/30 active:outline-slate-900/30 active:outline active:outline-8 active:outline-offset-0
  
          before:-z-[1] 
          translate-all duration-150 ease-in
          ${props.className}
          `)}
    >
      {props?.children ? <p>{props?.children}</p> : null}
    </button>
  );
};

Button.defaultProps = {
  variance: 'none',
};

Button.propTypes = {
  variance: PropTypes.oneOf(['filled', 'outlined', 'none']),
};

export default Button;
