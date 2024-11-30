import { prisma } from "../prismaClient";

export const insertCommand = async (command:string):Promise<{id:number;command:string;created_at:Date} | null> => {
    try {
        const savedCommand = await prisma.command.create({
            data:{command},
        });
        return {
            id: Number(savedCommand.id),  // Ensure id is a number, in case it's returned as a string
            command: savedCommand.command,
            created_at: savedCommand.created_at
          };
    } catch (error) {
        console.error('Error inserting command:', error);
        return null;
    }
};

export const searchCommands = async(keyword:string):Promise<{ id: number; command: string; created_at: Date }[]> => {
    try {
        const results = await prisma.command.findMany({
            where:{
                command:{
                    contains:keyword,
                    mode:"insensitive",
                },
            },
            orderBy:{
                created_at:"desc",
            },
        });
        return results.map(row => ({
            id: Number(row.id),  // id is already a number, no need for conversion
            command: row.command,
            created_at: row.created_at,
        }));
    } catch (error) {
        console.error('Error searching commands:', error);
        return [];
    }
};