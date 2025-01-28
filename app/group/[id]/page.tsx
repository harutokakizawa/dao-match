'use client'



import useSWR, {preload} from 'swr'
import JoinButton from '../../../components/JoinButton'
import { useAccount } from 'wagmi'

interface Member {
  id: number
  eoaAddress: string
  groupId: number
  createdAt: string
}

interface MemberListProps {
  members: Member[]
}

const fetcher = (url: string) => fetch(url).then(r => r.json())


export default function GroupDetail({ 
    params 
  }: { 
    params: { id: string } 
  }) {
  

  const account = useAccount()


  const { data: group, error: error1, isLoading: isLoad1 } = useSWR(`/api/groups/${params.id}`, fetcher)
  const { data: members, error: error2, isLoading: isLoading2 } = useSWR(`/api/member/${params.id}`, fetcher)

  if (error1 || error2) return <div>エラーが発生しました。</div>;
  if (!group || !members) return <div>読み込み中...</div>;
  
  //console.log(group.groups[0].id)
  //console.log(members)
  console.log(account.address)

  const data = {
    eoaAddress: account.address || '',
    groupId: Number(params.id)
  }

  console.log(data)

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-gray-900"> {group.groups[0].name} </h1>
      <p className="mb-4 text-lg">Safe Account: <span className="font-mono bg-gray-100 p-1 rounded">{group.groups[0].contractAddress}</span></p>

      
      <JoinButton eoaAddress={data.eoaAddress} groupId={data.groupId} />
      <div className="mb-12"/>
      <div/>
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Members Address</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.members.map((member: Member) => (
          <div
            key={member.id}
            className="border p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
          >
            <h3 className="text-lg font-bold mb-2 truncate">{member.eoaAddress}</h3>
            <p className="text-xs text-gray-500">Created at: {member.createdAt}</p>
          </div>
        ))}
      </div>
    </div> 
  )
}


