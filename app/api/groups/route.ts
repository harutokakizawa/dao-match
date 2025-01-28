import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const connect = async () => {
    try {
        //prismaでデータベースに接続
        db.$connect();
    } catch (error) {
        return Error("DB接続失敗しました")
    }
}


// データベースからデータを取得する
export const GET = async (req: Request) => {
    try {
        await connect();
        const groups = await db.group.findMany(
            
        );
        return Response.json({groups},{ status: 200 })

    } catch (error) {
        return Response.json({ messeage: "Error" },{ status: 500 })

    } finally {
    　　//必ず実行する
        await db.$disconnect();
    }
}