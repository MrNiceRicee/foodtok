import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from './LoadingBar';

interface statusType {
  loaded: Boolean;
  errored: Boolean;
}
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
  const [display, setDisplay] = useState<JSX.Element | null | undefined>(null);

  useEffect(() => {
    setDisplay(() => {
      if (status.errored) return error;
      if (!status.loaded) return loading;
      return null;
    });
  }, [status, setDisplay]);

  useEffect(() => {
    console.log(display);
  }, [display]);

  const onLoad = () => setStatus((old) => ({ ...old, loaded: false }));
  // const onError = ({currentTarget}: {currentTarget: JSX.Element}) => {

  // }

  return (
    <div>
      <img
        src={src}
        alt="image"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          setStatus((old) => ({ ...old, errored: true }));
        }}
        onLoad={onLoad}
        loading="lazy"
        className={`max-w-full max-h-full
        ${
          status.loaded
            ? 'opacity-100 brightness-100 contrast-100'
            : 'opacity-0 brightness-0 contrast-50'
        }
        
        `}
      />
      <div>{display}</div>
    </div>
  );
};

Image.defaultProps = {
  loading: <LoadingBar speed={'2'}/>,
};

export default Image;
