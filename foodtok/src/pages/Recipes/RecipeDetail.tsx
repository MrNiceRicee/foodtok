import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import ctl from '@netlify/classnames-template-literals';
import { one } from '@apis/recipes';
import { fetchData } from '@apis/tiktokEmbed';
import { recipe } from '@foodtok-types/recipe';
import CardLoading from '@components//CardLoading';
import Image from '@components//Image';
import { tiktok } from '@foodtok-types/tiktok';

const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn z-40"></div>
);
// const fetchTiktok = (url = '', id: string | 0) => {
//   const { data: tiktokData } = useQuery(`RecipeDetail_Tiktok_${id}`, () =>
//     fetchData(url).then((item) => item)
//   );
//   return tiktokData;
// };

const Thumbnail = ({
  recipe,
  tiktokData,
}: {
  recipe?: recipe;
  tiktokData?: tiktok;
}) => {
  return (
    <header
      className={ctl(`
        relative 
        ${tiktokData?.thumbnail_url ? 'h-auto' : 'h-[42rem]'}
        bg-gray-600
        md:basis-2/3
        rounded-t-lg
        overflow-hidden
      `)}
    >
      <div className="absolute inset-0 h-10 z-30 flex m-3">
        <h1
          className={ctl(`
          font-black
          uppercase
          text-6xl text-shadow
          transition-colors duration-700
          ${
            tiktokData?.thumbnail_url
              ? 'text-slate-100 shadow-orange-700 '
              : 'text-slate-700'
          }
        `)}
        >
          {recipe?.name}
        </h1>
      </div>
      <Image src={tiktokData?.thumbnail_url || ''} error={<DefaultUrl />} />
    </header>
  );
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [tiktokData, setTiktokdata] = useState<tiktok | null | undefined>();

  const { isLoading, data } = useQuery(`Recipe_${id}`, () =>
    one(id ? +id : 0).then(({ data }) => data.data)
  );

  useEffect(() => {
    if (data?.url) {
      fetchData(data?.url)
        .then((item) => {
          setTiktokdata(item);
        })
        .catch();
    }
  }, [id, data, setTiktokdata]);

  // const tiktokData = fetchTiktok(data?.url || '', id || 0);

  if (isLoading) return <CardLoading rKey="Loading_Recipe_Detail" />;

  return (
    <div className="w-full border-orange-200 py-3 pb-10 mb-10 md:flex no-underline">
      <Thumbnail
        recipe={data}
        tiktokData={tiktokData ? tiktokData : undefined}
      />
      <section
        className="container flex flex-col 
          px-2 md:basis-2/3
          prose dark:prose-invert
        "
      >
        <p className="font-light w-full p-2 flex flex-col">
          <strong className="font-black">{`${data?.User.name} `}</strong>
          {data?.description}
        </p>
        {tiktokData ? (
          <p className="font-light w-full p-2 flex flex-col">
            <strong className="font-black">@{tiktokData?.author_name}</strong>
            {tiktokData?.title}
          </p>
        ) : null}
      </section>
    </div>
  );
};

export default RecipeDetail;
