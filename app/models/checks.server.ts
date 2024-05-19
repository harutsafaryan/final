import { type User, type Check, type Todo, Prisma, } from "@prisma/client";
import { title } from "process";
import { prisma } from "~/db.server";
import { getMonthIndex } from "~/utility/helper";

export async function getChecks() {
    return await prisma.check.findMany({
        select: {
            id: true,
            value: true,
            text: true,
            comment: true,
            status: true,
            createdAt: true,
            user: { select: { name: true } },
            todo: { select: { title: true } }
        }
    });
}

export async function deleteCheck(id: Check['id']) {
    return await prisma.check.delete({ where: { id } })
}

export async function getCheckById(id: Check['id']) {
    return await prisma.check.findFirst({
        where: { id },
        select: {
            id: true,
            value: true,
            text: true,
            comment: true,
            status: true,
            createdAt: true,
            user: { select: { name: true } },
            todo: {select : {id: true}}
            }
        })
}

export async function getChecksByTodoId(todoId: Todo['id']) {
    return await prisma.check.findMany({
        where: { todoId },
        select: {
            value: true,
            text: true,
            comment: true,
            status: true,
            createdAt: true,
            user: { select: { name: true } }
        }
    })
}
//status, value, text, comment, record, todoId, userId

export async function createCheck({ status, value, text, comment, todoId, userId }: Pick<Check, 'status' | 'value' | 'text' | 'comment' | 'todoId' | 'userId'>) {
    const now = new Date();

    return await prisma.check.create({
        data: {
            status,
            value,
            text,
            comment,
            todoId,
            userId
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
            record: true,
            createdAt: true,
            user: true,
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