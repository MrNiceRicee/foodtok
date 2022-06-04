import ctl from '@netlify/classnames-template-literals';
import * as PropTypes from 'prop-types';

type prop = JSX.IntrinsicElements['input'] & {
  divClass?: string;
  inputClass?: string;
  title?: string;
  divStyle?: React.CSSProperties;
  variance: 'filled' | 'outline';
};

const TextInput = ({
  divClass,
  name,
  inputClass,
  value,
  divStyle,
  title,
  variance,
  type,
  ...props
}: prop) => {
  const onFocus = (event: React.FocusEvent<HTMLInputElement, Element>) =>
    event.target.select();

  if (variance === 'outline') {
    return (
      <div
        className={ctl(`
        relative w-full min-w-[15rem] 
        my-3
        border-b-2 border-slate-400 
        focus-within:border-pink-500
        text-slate-800 dark:text-slate-200
        ${divClass}
        ${props.className}
      `)}
        style={divStyle}
      >
        <input
          {...props}
          name={name}
          className={ctl(`
            block w-full
            prose
            px-0 pb-0
            appearance-none focus:outline-none focus:ring-0
            bg-transparent outline-none border-none
            text-slate-400 dark:text-slate-500
            active:text-slate-900 focus:text-slate-900
            dark:active:text-slate-200 dark:focus:text-slate-200
            duration-300
            ${inputClass}
          `)}
          onFocus={onFocus}
          type={type}
          value={value ?? ''}
          placeholder=" "
        />
        <label
          className={ctl(`
            prose absolute top-1/2 -translate-y-1/2 -z-1 origin-top
          `)}
          htmlFor={name}
        >
          {title || name}
        </label>
      </div>
    );
  }
  return (
    <div
      className={ctl(`
        flex flex-col w-full
        min-w-[15rem] py-3
        ${divClass}
        ${props.className}
      `)}
      style={divStyle}
    >
      <label
        className="w-full h-full prose font-bold font- text-slate-800 dark:text-slate-100"
        htmlFor={name}
      >
        {title || name}
      </label>
      <input
        {...props}
        name={name}
        className={ctl(`
        prose font-light 
        p-2
        text-slate-500 dark:text-slate-500
        active:text-slate-900 focus:text-slate-900
        dark:active:text-slate-200 dark:focus:text-slate-200
        bg-slate-200 dark:bg-slate-800
        rounded-lg
        outline-none
        w-full h-full
        flex-grow
        ${inputClass}
        `)}
        type={type}
        value={value}
        onFocus={onFocus}
      />
    </div>
  );
};

TextInput.propTypes = {
  value: PropTypes.string,
};

TextInput.defaultProps = {
  value: undefined,
  variance: 'filled',
  type: 'text',
};

export default TextInput;
