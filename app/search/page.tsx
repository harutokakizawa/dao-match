'use client'
import { headers } from 'next/headers';
import GroupList from '../../components/GroupList'
import useSWR from 'swr';




const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Search() {

  const { data: groups, error: error1, isLoading: isLoad1 } = useSWR(`/api/groups`, fetcher)

  if (error1) return <div>エラーが発生しました。</div>;
  if (isLoad1) return <div>読み込み中...</div>;
  
 
  // サーバーコンポーネントからクライアントコンポーネントにデータを渡す
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">グループ一覧</h1>
      <div className="mb-6 space-y-4 max-w-2xl mx-auto">
      </div>
      
      <GroupList groups={groups.groups} />
    </div>
  );
}