import ThemeButton from './darkmode';

function App() {
  return (
    <div className="bg-sky-300 dark:bg-sky-900">
      <h1 className="text-3xl font-bold underline text-violet-300 dark:text-yellow-200">
        Hey!
      </h1>
      <ThemeButton />
    </div>
  );
}

export default App;
