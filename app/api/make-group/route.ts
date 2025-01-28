import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

interface SubmitData {
    eoaAddress: string
    contractAddress: string
    name: string
    purpose?: string
    description?: string
}

const connect = async () => {
    try {
        //prismaでデータベースに接続
        db.$connect();
    } catch (error) {
        console.log(error)
        return Error("DB接続失敗しました")
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const data: SubmitData = await req.json()
        if (!data.name || !data.contractAddress) {
            return NextResponse.json(
              { error: 'Name and contract address are required' }, 
              { status: 400 }
            )
        }
        console.log('Received data:', data)
        
        let groupData: Prisma.GroupCreateInput
        if (data.purpose && data.description) {
            groupData = {
                name: data.name,
                purpose: data.purpose,
                description: data.description,
                contractAddress: data.contractAddress,
                joins: {
                    create: [
                      { eoaAddress: data.eoaAddress },
                    ],
                }
            }
        } else {
            groupData = {
                name: data.name,
                contractAddress: data.contractAddress,
                joins: {
                    create: [
                      { eoaAddress: data.eoaAddress },
                    ],
                }
            }
        }

        

        await connect();
        // 以下でprismaを使ってデータベースにデータを保存する 

        await db.group.create({ 
            data: groupData,
            include: {
                joins: true,
            }, })


         // Return a success response
        return NextResponse.json({ 
            message: 'Submission successful', 
            receivedData: data 
        }, { status: 201 })

        

    } catch (error) {
        console.log(error)
        return Response.json({ messeage: "Error" },{ status: 500 })

    } finally {
    　　//必ず実行する
        await db.$disconnect();
    }
}
