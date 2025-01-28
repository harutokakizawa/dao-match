'use client'


import React from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface Join {
    eoaAddress: string;
    groupId: number;
  }

async function createJoin(url: string, { arg }: { arg: Join }) {
    const { eoaAddress, groupId } = arg;
    await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eoaAddress,
        groupId
      }),
    });
  }

export default function JoinButton( serverData : { eoaAddress: string, groupId: number }) {

    const { trigger, isMutating } = useSWRMutation(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/join-group`, createJoin);

    if (!serverData.eoaAddress || !serverData.groupId) {
        throw new Error("EOA address and group ID are required");
    }
    


    return (
        <button 
            disabled={isMutating} 
            type="button" 
            onClick={async () => {
                    try {
                      await trigger({
                        eoaAddress: serverData.eoaAddress,
                        groupId: serverData.groupId,
                      });
                      window.location.reload()
                    } catch (e) {
                      console.error(e);
                      alert('参加に失敗しました。');
                    }
                }
            } 
            className={`bg-black text-white font-bold py-3 px-6 rounded-lg transition duration-150 ease-in-out transform ${
                isMutating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-gray-800'
              } w-full`}
            >
              {isMutating ? '送信中...' : 'グループに参加'}

         </button>
    );
}

