import Link from 'next/link'

interface Group {
  id: number
  contractAddress: string
  name: string
  tags?: string[]
}

interface GroupListProps {
  groups: Group[]
}

export default function GroupList({ groups }: GroupListProps) {

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <Link key={group.id} href={`/group/${group.id}`}>
        <div
          key={group.id}
          className="border p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
        >
          <h3 className="text-lg font-bold mb-2 truncate">{group.name}</h3>
          <p className="text-gray-500 text-xs truncate">{group.contractAddress}</p>
          <br></br>
          <div className="flex flex-wrap gap-2">
            {group.tags?.length ?? 0 > 0 ? (
              (group.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">タグがありません</span>
            )}
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

