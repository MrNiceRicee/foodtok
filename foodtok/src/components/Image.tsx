import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from './LoadingBar';
import ctl from '@netlify/classnames-template-literals';

interface statusType {
  loaded: Boolean;
  errored: Boolean;
}

const Error = () => (
  <div
    className="
      w-full h-full
      min-h-full
      bg-gray-400 dark:bg-gray-600
      flex justify-center items-center
      p-1
    "
  >
    <h1 className="prose dark:prose-invert">Image failed to load</h1>
  </div>
);

const Image = ({
  src = '',
  loading,
  error,
}: {
  src: string;
  loading?: JSX.Element;
  error?: JSX.Element;
}) => {
  const [status, setStatus] = useState<statusType>({
    loaded: false,
    errored: false,
  });
  const [display, setDisplay] = useState<JSX.Element | null | undefined>(
    loading
  );

  useEffect(() => {
    setDisplay(() => {
      if (status.errored) return error;
      if (!status.loaded) return loading;
      console.log('should be null');
      return null;
    });
  }, [status.loaded, status.errored, setDisplay]);

  const styles = useMemo(
    () => ({
      image: ctl(`
        max-w-full min-w-full h-auto m-0 z-10
        ${
          status.loaded
            ? 'opacity-100 brightness-100 contrast-100'
            : 'opacity-0 brightness-0 contrast-50'
        }
          `),
      iconContainer: ctl(`
        absolute inset-0 h-full w-full
        transition-all duration-1000 ease-in-out
        ${status.loaded ? 'opacity-0' : 'opacity-100'}
          `),
    }),
    [display, status.errored, status.loaded]
  );

  const onLoad = () => setStatus((old) => ({ ...old, loaded: true }));

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={src}
        alt="image"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          setStatus((old) => ({ ...old, errored: true }));
        }}
        onLoad={onLoad}
        loading="lazy"
        className={styles.image}
      />
      <div className={styles.iconContainer}>{display}</div>
    </div>
  );
};

Image.defaultProps = {
  loading: <LoadingBar />,
  error: <Error />,
};

export default Image;
