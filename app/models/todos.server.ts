import type { User, ToDo } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getTodos() {
    return await prisma.todo.findMany();
}

export async function deleteTodo(id: ToDo['id']) {
    return await prisma.todo.delete({ where: { id } })
}

export async function getTodoById(id: ToDo['id']) {
    return await prisma.todo.findFirst({ where: { id } })
}

export async function createTodo({ description, interval, userId }: Pick<ToDo, 'description' | 'interval' | 'userId'>) {
    return await prisma.todo.create({
        data: {
            description, interval, userId
        }
    })
}
