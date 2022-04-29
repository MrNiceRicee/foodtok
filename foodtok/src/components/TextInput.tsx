import ctl from '@netlify/classnames-template-literals';
import * as PropTypes from 'prop-types';
import * as React from 'react';

interface Props
  extends React.DetailedHTMLProps<
      React.HtmlHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

interface prop extends Props {
  name: string;
  value: string;
}

const TextInput = (props: prop) => {
  return (
    <div className="flex flex-col min-w-[20rem] py-3">
      <label className="prose font-bold font- text-slate-800 dark:text-slate-100">
        {props.name}
      </label>
      <input
        {...props}
        name={props.name}
        className={ctl(`
        prose font-light 
        p-2
        text-slate-700 dark:text-slate-400
        active:text-slate-900 focus:text-slate-900
        dark:active:text-slate-200 dark:focus:text-slate-200
        bg-slate-200 dark:bg-slate-800
        rounded-lg
        outline-none
        `)}
        type="text"
        value={props.value}
      />
    </div>
  );
};

TextInput.propTypes = {
  value: PropTypes.string,
};

TextInput.defaultProps = {
  value: undefined,
};

export default TextInput;
