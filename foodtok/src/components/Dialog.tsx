import ctl from '@netlify/classnames-template-literals';
import { useEffect, useState } from 'react';
// import { useQueryClient } from 'react-query';
import Button from './Button';

const Dialog = (props: prop): React.ReactElement<Props> => {
  const [open, setOpen] = useState(props?.open);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen((old) => !old);
  }, [props.open]);

  return (
    <div
      {...props}
      className={ctl(`
        m-safe p-safe sm:max-w-2xl container
        fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-lg bg-slate-700
        ${open ? 'opacity-100 top-1/2' : 'opacity-0 scale-50 top-3/4 cursor-none select-none'}
        transition-all duration-200 ease-out
        overflow-hidden border-t border-gray-50/50
        shadow-2xl
        backdrop-blur-xl
        ${props?.className}
      `)}
      role='dialog'
    >
      <header className="py-4 px-6 shadow-inner">
        <h2 className="prose dark:prose-invert font-extrabold text-4xl text-slate-100">
          {props.header}
        </h2>
      </header>
      <section className="py-4 px-6 bg-slate-500 border-t border-gray-50/30 shadow-md shadow-slate-800 w-full inline-block">
        {props?.children}
      </section>
      <footer className="py-3 px-6 flex justify-between shadow-inner">
        <Button className="mx-2 prose-p:text-amber-300" onClick={handleClose}>
          cancel
        </Button>
        <Button variance="filled" className="mx-2 bg-sky-500">
          confirm
        </Button>
      </footer>
    </div>
  );
};

export default Dialog;

interface Props
  extends React.DetailedHTMLProps<
      React.HtmlHTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    React.AriaAttributes {}

interface prop extends Props {
  open: boolean;
  header: string;
}

Dialog.defaultProps = {
  open: false,
  header: 'Poppy Up!',
};
