import ctl from '@netlify/classnames-template-literals';
import { recipe } from '@foodtok-types/recipe';

const RecipeForm = ({
  header = 'Recipe Form',
  model,
}: {
  header?: string;
  model?: recipe | undefined;
}) => {
  return (
    <div
      className={ctl(`
        m-safe p-safe w-full flex justify-center content-center
        `)}
    >
      <form className="bg-slate-50 dark:bg-slate-900 rounded-lg px-6 shadow-lg">
        <header className="py-4 shadow-inner text-center">
          <h2
            className="
            prose dark:prose-invert
            font-extrabold text-4xl
            text-slate-800 dark:text-slate-100"
          >
            {header}
          </h2>
        </header>
        <section>
          <div className="flex flex-col min-w-[20rem] py-3">
            <label className="prose font-semibold text-slate-800 dark:text-slate-100">
              hahahaha
            </label>
            <input
              className={ctl(`
                prose font-medium 
                p-2
                text-slate-900 dark:text-slate-50
                bg-slate-200 dark:bg-slate-700
                rounded-lg
                `)}
            />
          </div>
        </section>
        <footer></footer>
      </form>
    </div>
  );
};

export default RecipeForm;
