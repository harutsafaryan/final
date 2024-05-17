import type { User, Check, Todo,  } from "@prisma/client";
import { prisma } from "~/db.server";
import { getMonthIndex } from "~/utility/helper";

export async function getChecks() {
    return await prisma.check.findMany();
}

export async function deleteCheck(id: Check['id']) {
    return await prisma.check.delete({ where: { id } })
}

export async function getCheckById(id: Check['id']) {
    return await prisma.check.findFirst({
        where: { id },
        include: {
            todo: true
        }
    })
}

export async function getChecksByTodoId(todoId: Todo['id']) {
    return await prisma.check.findMany({
        where: { todoId },
        include: {
            todo: true,
            user : true
        }
    })
}
//status, value, text, comment, record, todoId, userId

export async function createCheck({ status, value, text, comment, todoId, userId }: Pick<Check, 'status' | 'value' | 'text' | 'comment' | 'todoId' | 'userId'>) {
    const now = new Date();

    

    await new Promise(res => setTimeout(res, 500));
    return await prisma.check.create({
        data: {
            status, value, text, comment, todoId, userId
        }
    })
}

export async function generateChecks() {
    const random = Math.random() * 10000;
    const text = random.toString();
    await prisma.check.create({
        data: {
            todoId: 1,
            userId: 1
        }
    })
}

export async function lastAction() {
    return await prisma.check.groupBy({
        by: ['todoId'],
        _max: { createdAt: true }
    })
}

export async function checkCount() {
    return await prisma.check.groupBy({
        by: ['todoId'],
        _count: true
    })
}

export async function groupCheckByDate() {
    return await prisma.check.groupBy({
        by: ['createdAt'],
        _count: { month: true }
    })
}

export async function groupChecks(date: Date) {
    return await prisma.check.groupBy({
        by: ['date'],
        _count: { date: true }
    })
}

export async function getChecksByDateInterval(from: Date, to: Date) {
    return await prisma.check.findMany({
        where: {
            AND: [
                { createdAt: { gte: from } },
                { createdAt: { lte: to } }
            ]
        }
    })
}

export async function getChecksByMonth(month: string) {
    const monthIndex = getMonthIndex(month);
    const startDate = new Date(2024, monthIndex, 1);
    const endDate = new Date(2024, monthIndex + 1, 1);

    return await prisma.check.findMany({
        where: {
            AND: [
                { createdAt: { gte: startDate } },
                { createdAt: { lte: endDate } },
            ]
        },
        select: {
            id: true,
            record : true,
            createdAt: true,
            user : true,
            year: true,
            month: true,
            day: true,
            todo: {
                select: {
                    title: true
                }
            }
        }
    })
}