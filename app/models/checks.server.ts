import type { User, Check } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getChecks() {
    return await prisma.check.findMany();
}

export async function deleteCheck(id: Check['id']) {
    return await prisma.check.delete({ where: { id } })
}

export async function getCheckById(id: Check['id']) {
    return await prisma.check.findFirst({ where: { id } })
}

export async function createCheck({ comment, todoId, userId }: Pick<Check, 'comment' | 'todoId' | 'userId'>) {
    return await prisma.check.create({
        data: {comment, todoId, userId
        }
    })
}
