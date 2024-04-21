import type { User, Reference as Method } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getMethods() {
    return await prisma.method.findMany();
}

export async function deleteMethod(id: Method['id']) {
    return await prisma.method.delete({ where: { id } })
}

export async function getMethodById(id: Method['id']) {
    return await prisma.method.findFirst({
        where: { id },
    })
}

export async function createMethod({ name }: Pick<Method, 'name'>) {
    return await prisma.method.create({
        data: { name }
    })
}

