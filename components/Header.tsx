import Link from 'next/link';
import Github from './GitHub';

export default function Header() {
  return (
    <header className="flex flex-col items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-5">
        <img
          alt="header text"
          src="/favicon.png"
          className="sm:w-9 sm:h-9 w-8 h-8"
        />
        <h1 className="sm:text-3xl text-2xl font-bold mr-1 tracking-tight font-mono">
          Find Your Next Starbucks Drink
        </h1>
        <img
          alt="header text"
          src="/favicon.png"
          className="sm:w-9 sm:h-9 w-8 h-8"
        />
      </Link>
    </header>
  );
}
