import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const AddButton = (props?: ButtonProps): React.ReactElement<ButtonProps> => (
  <button
    {...props}
    className="
        outline-none
        absolute right-6 bottom-[4.5rem] 
        w-14 h-14 rounded-full
        flex justify-center items-center
        shadow-lg
        shadow-sky-800/50
        bg-sky-400 dark:bg-sky-500
        hover:bg-sky-500 active:bg-sky-500 focus:bg-sky-500 
        hover:shadow-sky-800/50 active:shadow-sky-800/50 focus:shadow-sky-800/50
        hover:shadow-sm active:shadow-sm focus:shadow-sm 
        dark:hover:bg-sky-500 dark:active:bg-sky-500 dark:focus:bg-sky-500
        transition-all duration-300 ease-out
        "
  >
    <FontAwesomeIcon className="w-1/2 h-1/2 text-slate-100" icon={faPlus} />
    {props?.children}
  </button>
);

export default AddButton;
