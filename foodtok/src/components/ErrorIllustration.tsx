import ctl from '@netlify/classnames-template-literals';
import { ReactComponent as NotFound } from '../illustration/notFound.svg';

const ErrorIllustration = ({ errorMsg }: { errorMsg: string }) => {
  return (
    <div
      className={ctl(`
        relative
        w-full h-screen
        min-h-full
        flex justify-center items-center
        p-1
        rounded-lg
        overflow-hidden
        bg-red-400
        animate-fadeIn
      `)}
    >
      <NotFound className="w-full h-full scale-[1.6]" />
      <h1
        className={ctl(`
            absolute inset-0
            prose dark:prose-invert text-slate-900
            dark:text-slate-50
            left-5
            font-light
            text-7xl
            `)}
      >
        {errorMsg}
      </h1>
    </div>
  );
};

ErrorIllustration.defaultProps = {
  errorMsg: 'oops! found nothing here!',
};

export default ErrorIllustration;
