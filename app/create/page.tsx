'use client'

import { useState } from 'react'
import { submitForm } from './submitForm'
import { safeDeploy } from './safeDeploy'






export default function CreateGroup() {


  const [groupName, setGroupName] = useState('');
  const [groupPurpose, setGroupPurpose] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setAddresses(await safeDeploy());
    console.log(addresses)
    
    // ここでグループ作成のロジックを実装します。
    const res = await submitForm({ eoaAddress: addresses[0],contractAddress: addresses[1], name: groupName, purpose: groupPurpose, description: groupDescription });


    //const a: string = await safeDeploy();
    //setSafeAddress(a)

    setIsLoading(true);

    setTimeout(() => {
      console.log('Group created:', res);
      setGroupName('');
      setGroupPurpose('');
      setGroupDescription('');
      setSelectedTags([]);
      setIsLoading(false);
    }, 2000); // 2秒の遅延をシミュレーション

    
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">新しいグループを作成</h1>
      <p className="text-center text-gray-700 mb-8">
        グループ名、説明、タグを入力して新しいグループを作成しましょう。
      </p>
      <p className="mb-8 text-center text-gray-800">{addresses[1] && `Safe Address: ${addresses[1]}`}</p>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Safariの自動入力を隠しフィールドで誘導 */}
        <input type="text" style={{ display: 'none' }} autoComplete="username" />
        <div>
          <label htmlFor="groupName" className="block mb-2 font-semibold text-gray-800">
            グループ名: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="groupName"
            name="new-group-name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            autoComplete="new-password"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
          <p className="text-sm text-gray-500 mt-1">※グループ名は必須です</p>
        </div>
        <div>
          <label htmlFor="groupPurpose" className="block mb-2">目的:</label>
          <textarea
            id="groupPurpose"
            value={groupPurpose}
            onChange={(e) => setGroupPurpose(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">（グループの目的を記述してください）</p>
        </div>
        <div>
          <label htmlFor="groupDescription" className="block mb-2 font-semibold text-gray-800">説明:</label>
          <textarea
            id="groupDescription"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">（グループの概要を簡単に記述してください）</p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-black text-white font-bold py-3 px-6 rounded-lg transition duration-150 ease-in-out transform ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-gray-800'
          } w-full`}
        >
          {isLoading ? '送信中...' : 'グループを作成'}
        </button>

        

      </form>
      
      
    </div>
  )
}


/* <label htmlFor="tags" className="block mb-2">Tags:</label>
          <TagSelector
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          /> */

          /*
          <div>
          <label htmlFor="tags" className="block mb-2 font-semibold text-gray-800">タグ:</label>
          <p className="text-sm text-gray-500 mb-2">（関連するキーワードを選択してください）</p>
          <TagSelector
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
          
        </div>
          
          {selectedTags.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-700">選択されたタグ:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-black text-white text-xs font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}*/