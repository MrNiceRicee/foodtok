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
            bg-slate-500 
            font-bold text-lg
    
            before:absolute before:inset-0 before:w-full before:h-full before:bg-inherit before:rounded-[inherit] before:opacity-25 
            hover:before:opacity-25 hover:before:h-[calc(100%+0.75rem)] hover:before:w-[calc(100%+0.75rem)] hover:before:-left-1.5 hover:before:-top-1.5
            after:before:opacity-25 after:before:h-[calc(100%+0.75rem)] after:before:w-[calc(100%+0.75rem)] after:before:-left-1.5 after:before:-top-1.5
            focus:before:opacity-25 focus:before:h-[calc(100%+0.75rem)] focus:before:w-[calc(100%+0.75rem)] focus:before:-left-1.5 focus:before:-top-1.5 
            before:z-[-1] 
    
            shadow-md shadow-slate-800/50
            hover:shadow-sm focus:shadow-sm active:shadow-sm

            before:transition-all before:duration-150 before:ease-in
            translate-all duration-150 ease-in
            ${props.className}
            `)}
      >
        {props?.children ? <p>{props?.children}</p> : null}
      </button>
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
  
          before:absolute before:inset-[12.5%] before:w-3/4 before:h-3/4  before:rounded-[inherit] before:origin-center
          hover:before:bg-slate-50/10 hover:before:h-[calc(100%+0.75rem)] hover:before:w-[calc(100%+0.75rem)] hover:before:-left-1.5 hover:before:-top-1.5
          after:before:bg-slate-50/10 after:before:h-[calc(100%+0.75rem)] after:before:w-[calc(100%+0.75rem)] after:before:-left-1.5 after:before:-top-1.5
          focus:before:bg-slate-50/10 focus:before:h-[calc(100%+0.75rem)] focus:before:w-[calc(100%+0.75rem)] focus:before:-left-1.5 focus:before:-top-1.5
          before:transition-all before:duration-150 before:ease-in
  
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
