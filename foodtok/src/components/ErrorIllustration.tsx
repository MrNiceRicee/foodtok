import PropTypes from 'prop-types';
import { ReactComponent as NotFound } from '../illustration/notFound.svg';

const ErrorIllustration = ({ errorMsg }: { errorMsg: string }) => {
  return (
    <div
      className="
        relative
        w-full h-screen
        min-h-full
        bg-red-400 dark:bg-red-500
        flex justify-center items-center
        p-1
        rounded-lg
      "
    >
      <NotFound className="w-full h-full" />
      <h1
        className="
            absolute inset-0
            prose dark:prose-invert text-slate-100
            dark:text-slate-50
            top-1/4
            left-5
            font-light
            text-5xl
            "
      >
        {errorMsg}
      </h1>
    </div>
  );
};

ErrorIllustration.propTypes = {
  errorMsg: PropTypes.string,
};

ErrorIllustration.defaultProps = {
  errorMsg: 'oops! found nothing here!',
};

export default ErrorIllustration;
