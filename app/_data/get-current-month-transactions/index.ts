import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";

export const getCurrentMonthTransactions = async () => {
    const authResponse = await auth();
    const userId = authResponse.userId;
    if (!userId) {
        throw new Error("Unauthorized");
    }
    return db.transaction.count({
        where: {
            userId,
            createdAt: {
                gte: startOfMonth(new Date()),
                lt: endOfMonth(new Date()),
            },
        },
    });
};