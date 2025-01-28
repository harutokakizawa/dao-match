'use client'

import Link from 'next/link'
import useSWR from 'swr';
import { useAccount } from 'wagmi';
import MyGroupList from '../components/MyGroupList';


interface Group {
  id: number
  contractAddress: string
  name: string
  tags?: string[]
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
  // この例では、所属グループのデータをハードコードしています。
  // 実際のアプリケーションでは、このデータをAPIから取得する必要があります。
  const ad = useAccount().address
  
  const { data: myGroup, error: error1, isLoading: isLoad1 } = useSWR(`/api/myGroups/${ad}`, fetcher)
  if (error1) return <div>エラーが発生しました。</div>;
  if (isLoad1) return <div>読み込み中...</div>;

  console.log(myGroup)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">DAO matchへようこそ</h1>
      <div className="flex justify-center mb-8">
        <Link
          href="/create"
          className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-150 ease-in-out transform hover:scale-105"
        >
          新しいグループを作成
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">あなたのグループ</h2>
      <MyGroupList groups={myGroup.groups} />
      
    </div>
  )
}

