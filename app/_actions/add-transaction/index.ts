"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
    TransactionCategory,
    TransactionPaymentMethod,
    TransactionType,
} from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
    name: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    paymentMethod: TransactionPaymentMethod;
    date: Date;
}

export const addTransaction = async (params: AddTransactionParams) => {
    addTransactionSchema.parse(params);

    const authResponse = await auth();

    const userID = authResponse.userId; // Pegue o ID do usuário

    if (!userID) {
        throw new Error("Unauthorized");
    }
    await db.transaction.create({
        data: { ...params, userId: userID },
    });
    revalidatePath("/transactions");
};