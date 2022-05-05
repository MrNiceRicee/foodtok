import { AxiosError } from 'axios';
import { ReactNode } from 'react';
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
  if ([401, 403].includes(error.response?.status || 0)) {
    navigate('unauthorized');
    return <></>;
  }

  return <>{children}</>;
};

export default OnError;
