import Button from '@components/Button';
import ctl from '@netlify/classnames-template-literals';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const handleGoLogin = () => navigate('/account');
  return (
    <div
      className={ctl(`
      w-full h-screen
      flex flex-col justify-center items-center relative
      gap-10
      overflow-hidden 
    `)}
    >
      <h1 className="text-5xl text-slate-800 dark:text-slate-200 prose prose-invert">
        Sorry, can&apos;t access that!
      </h1>
      <div className="flex gap-10">
        <Button className="shadow-none" onClick={handleGoBack}>
          Go back
        </Button>
        <Button
          className="bg-emerald-300 dark:bg-emerald-600"
          onClick={handleGoLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
