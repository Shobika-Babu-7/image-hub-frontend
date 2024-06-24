'use client'

import Link from 'next/link';

export default function Header() {

  const logout = () => {
    sessionStorage.clear();
  }

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">
          <Link href="/">Logo</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/profile">Profile</Link>
          <Link href="/" onClick={logout}>Logout</Link>
        </nav>
        <div className="md:hidden">
          <button className="text-gray-400 hover:text-white focus:outline-none focus:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
