import type { User, Check } from "@prisma/client";
import { prisma } from "~/db.server";

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

export async function createCheck({ record, todoId, userId }: Pick<Check, 'record' | 'todoId' | 'userId'>) {
    const now = new Date();

    await new Promise(res => setTimeout(res, 500));
    return await prisma.check.create({
        data: {
            record, todoId, userId,
            year: now.getFullYear(),
            month: now.getMonth(),
            weekday: now.getDay(),
            day: now.getDate()
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

export async function getChecksByMonth(month: number) {
    const startDate = new Date(2024, month, 1);
    const endDate = new Date(2024, month + 1, 1);

    return await prisma.check.findMany({
        where: {
            AND: [
                { createdAt: { gte: startDate } },
                { createdAt: { lte: endDate } },
            ]
        },
        select: {
            id: true,
            year: true,
            month : true,
            day : true,
            todo: {
                select: {
                    title: true
                }
            }
        }
    })
}