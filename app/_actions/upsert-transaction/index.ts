"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
    TransactionCategory,
    TransactionPaymentMethod,
    TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface upsertTransactionParams {
    id?: string;
    name: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    paymentMethod: TransactionPaymentMethod;
    date: Date;
}

export const upsertTransaction = async (params: upsertTransactionParams) => {
    upsertTransactionSchema.parse(params);

    const authResponse = await auth();

    const userID = authResponse.userId; // Pegue o ID do usuário

    if (!userID) {
        throw new Error("Unauthorized");
    }
    await db.transaction.upsert({
        update: { ...params, userId: userID },
        create: { ...params, userId: userID },
        where: {
            id: params?.id ?? "",
        },
    });
    revalidatePath("/transactions");
};