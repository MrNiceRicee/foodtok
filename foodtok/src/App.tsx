import ThemeButton from './darkmode';

function App() {
  return (
    <div className="bg-sky-300 dark:bg-sky-900 container !max-w-4xl mx-auto flex justify-center ">
      <h1 className="text-3xl font-bold underline dark:text-violet-300 text-yellow-200 px-10">
        Hey!
      </h1>
      <ThemeButton />
    </div>
  );
}

export default App;
