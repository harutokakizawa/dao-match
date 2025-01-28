import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
  <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
    <Link href="/">
    <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0" >DAO match</h1>
    </Link>
    
    <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <li><appkit-button/></li>

      <li>
        <Link href="/search" className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition duration-150 ease-in-out">
          グループを探す
        </Link>
      </li>
      <li>
        <Link href="/create" className="text-lg font-semibold bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-150 ease-in-out">
          新しいグループを作成
        </Link>
      </li>
    </ul>
  </nav>
</header>

  )
}

