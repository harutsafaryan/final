import type { Reference } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getReferences() {
    return await prisma.reference.findMany();
}

export async function deleteReference(id: Reference['id']) {
    return await prisma.reference.delete({ where: { id } })
}

export async function getReferenceById(id: Reference['id']) {
    return await prisma.reference.findFirst({
        where: { id },
    })
}

export async function createReference({ name }: Pick<Reference, 'name'>) {
    return await prisma.reference.create({
        data: { name }
    })
}

