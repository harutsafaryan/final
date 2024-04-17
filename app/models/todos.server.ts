import type { User, ToDo } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getTodos() {
    return await prisma.toDo.findMany();
}