import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

interface SubmitData {
    eoaAddress: string
    groupId: number
}

export const connect = async () => {
    try {
        //prismaでデータベースに接続
        db.$connect();
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const data: SubmitData = await req.json()
        
        console.log('Received data:', data)
        
        let joinData: Prisma.joinGroupCreateInput
        
        joinData = {
            eoaAddress: data.eoaAddress,
            group: { connect: { id: data.groupId } } },
        
        await connect();
        // 以下でprismaを使ってデータベースにデータを保存する 
        console.log('Joining group:', joinData)
        const joinGroup = await db.joinGroup.create({ 
            data: joinData,
        })


         // Return a success response
        return NextResponse.json({ 
            message: 'Submission successful', 
            receivedData: data 
        }, { status: 201 })

        

    } catch (error) {
        return Response.json({ messeage: "Error" },{ status: 500 })

    } finally {
    　　//必ず実行する
        await db.$disconnect();
    }
}
