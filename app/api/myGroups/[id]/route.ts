import { db } from "@/lib/prisma";


const connect = async () => {
    try {
        //prismaでデータベースに接続
        db.$connect();
    } catch (error) {
        console.log(error)
        return Error("DB接続失敗しました")
    }
}

// データベースからデータを取得する
export const GET = async (req: Request,  { params }: { params: { id: string }}) => {
    try {
        const pid = params.id;

        await connect();

        const groups = await db.joinGroup.findMany({
            where: {
                eoaAddress: pid
            },
            
            include: {
                group: true,
            },
            
        });
        
       
        return Response.json({groups},{ status: 200 })

    } catch (error) {
        console.log(error)
        return Response.json({ messeage: "Error" },{ status: 500 })

    } finally {
    　　//必ず実行する
        await db.$disconnect();
    }
}