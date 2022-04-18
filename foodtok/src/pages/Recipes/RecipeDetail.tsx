import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { one } from '../../api/recipes';
import { fetchData } from '../../api/tiktokEmbed';
import { recipe } from '../../types/search';
import CardLoading from '../../components/CardLoading';
import Image from '../../components/Image';

const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn"></div>
);

const Thumbnail = ({ recipe }: { recipe?: recipe }) => {
  const { data: tiktokData } = useQuery('RecipeDetail_Tiktok', () =>
    fetchData(recipe?.url || '').then((item) => item)
  );

  return (
    <header
      className={`
    relative 
    ${tiktokData?.thumbnail_url ? 'h-auto min-h-[30rem]' : 'h-72'}
    bg-gray-600
    md:basis-1/2
    rounded-t-lg
    overflow-hidden
    `}
    >
      <div className="absolute inset-0 h-10 z-30 flex m-3">
        <h1
          className={`
          font-black
          uppercase
          text-6xl text-shadow
          transition-colors duration-700
          ${
            tiktokData?.thumbnail_url
              ? 'text-slate-100 shadow-orange-700 '
              : 'text-slate-700'
          }
        `}
        >
          {recipe?.name}
        </h1>
      </div>
      <Image src={tiktokData?.thumbnail_url || ''} error={<DefaultUrl />} />
    </header>
  );
};

const RecipeDetail = () => {
  const { id = 0 } = useParams();
  const { isLoading, data } = useQuery(`Recipe_${id}`, () =>
    one(+id).then(({ data }) => data.data)
  );

  if (isLoading) return <CardLoading rKey="Loading_Recipe_Detail" />;

  return (
    <div className="w-full border-orange-200 mb-2 md:flex no-underline">
      <Thumbnail recipe={data} />
      <section className="container flex h-12 prose dark:prose-invert px-2 md:basis-2/3">
        <p className="font-light">
          <strong className="font-black">{`${data?.Creator.name} `}</strong>
          {data?.description}
        </p>
      </section>
    </div>
  );
};

export default RecipeDetail;
