import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ctl from '@netlify/classnames-template-literals';
import { getRecipe } from '@apis/recipes';
import { fetchData } from '@apis/tiktokEmbed';
import { recipe } from '@foodtok-types/recipe';
import CardLoading from '@components//CardLoading';
import Image from '@components//Image';
import { tiktok } from '@foodtok-types/tiktok';

const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn z-40"></div>
);

const Thumbnail = ({
  recipe,
  tiktokData,
}: {
  recipe?: recipe;
  tiktokData?: tiktok;
}) => {
  console.log('recipe', recipe);
  console.log('tiktokData', tiktokData);
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
      <div className="absolute inset-0 h-10 z-30 flex m-3 pointer-events-none">
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
      <a href={recipe?.url || undefined}>
        <Image src={tiktokData?.thumbnail_url || ''} error={<DefaultUrl />} />
      </a>
    </header>
  );
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [tiktokData, setTiktokdata] = useState<tiktok | null | undefined>();

  const { isLoading, data } = getRecipe(id ? +id : 0);

  useEffect(() => {
    if (data?.longUrl) {
      fetchData(data?.longUrl)
        .then((item) => {
          setTiktokdata(item);
        })
        .catch();
    }
  }, [id, data, setTiktokdata]);

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
