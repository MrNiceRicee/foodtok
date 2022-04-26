import ctl from '@netlify/classnames-template-literals';
import * as PropTypes from 'prop-types';

const TextInput = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <div className="flex flex-col min-w-[20rem] py-3">
      <label className="prose font-bold font- text-slate-800 dark:text-slate-100">
        hahahaha
      </label>
      <input
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
        value={defaultValue}
      />
    </div>
  );
};

TextInput.propTypes = {
  defaultValue: PropTypes.string,
};

TextInput.defaultProps = {
  defaultValue: undefined,
};

export default TextInput;
