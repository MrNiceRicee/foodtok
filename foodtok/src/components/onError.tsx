import { AxiosError } from 'axios';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface onErrorProps {
  error: AxiosError;
  children: ReactNode | ReactNode[];
}

/**
 * @description use this whenever we have any ReactQueries!
 */
const OnError = ({ error, children }: onErrorProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if ([401, 403].includes(error.response?.status || 0)) {
      navigate('/unauthorized');
    }
  }, [error]);

  return <>{children}</>;
};

export default OnError;
