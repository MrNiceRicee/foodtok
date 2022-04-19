import PropTypes from 'prop-types';

const ErrorComp = ({ errorMsg }: { errorMsg: string }) => {
  return (
    <div
      className="
        w-full h-full
        min-h-full
        bg-red-400 dark:bg-red-600
        flex justify-center items-center
        p-1
      "
    >
      <h1 className="prose dark:prose-invert text-slate-800">{errorMsg}</h1>
    </div>
  );
};

ErrorComp.propTypes = {
  errorMsg: PropTypes.string,
};

ErrorComp.defaultProps = {
  errorMsg: 'oops! something went wrong!',
};

export default ErrorComp;
