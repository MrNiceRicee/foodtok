import Image from '../../components/Image';
import { searchData } from '../../types/search';

const RecipeCard = ({ recipe }: { recipe: searchData }) => {
  return (
    <div className="container h-52 bg-sky-300 my-2">
      <Image src='https://cdn.discordapp.com/emojis/835584867889840168.png'/>
      <>Recipe card</>
    </div>
  );
};

export default RecipeCard;
