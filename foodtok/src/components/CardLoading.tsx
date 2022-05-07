import LoadingBar from './LoadingBar';

const CardLoading = ({ rows = 1, rKey }: { rows?: number; rKey: string }) => {
  const newArray: string[] = new Array(rows).fill('');
  return (
    <>
      {newArray.map((_, index) => (
        <div
          className=" w-full rounded-lg md:flex py-2"
          key={`${rKey}_${index}`}
        >
          <div className="md:basis-full h-72">
            <LoadingBar rounded />
          </div>
          <div className=" md:ml-3 md:basis-2/3 flex flex-col pt-1 pl-1">
            <div className="h-12 w-full">
              <LoadingBar rounded />
            </div>
            <div className="h-6 w-full pt-1 flex">
              <div className="w-2/3 pr-1">
                <LoadingBar rounded />
              </div>
              <div className="w-1/3 pl-1">
                <LoadingBar rounded />
              </div>
            </div>
            <div className="h-6 w-full pt-1 flex">
              <div className="w-1/4 pr-1">
                <LoadingBar rounded />
              </div>
              <div className="w-1/2 px-1">
                <LoadingBar rounded />
              </div>
              <div className="w-1/4 pr-1">
                <LoadingBar rounded />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardLoading;
