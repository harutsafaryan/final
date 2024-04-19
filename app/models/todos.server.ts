import type { User, Todo } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getTodos() {
    return await prisma.todo.findMany();
}

export async function deleteTodo(id: Todo['id']) {
    return await prisma.todo.delete({ where: { id } })
}

export async function getTodoById(id: Todo['id']) {
    return await prisma.todo.findFirst({ where: { id } })
}

export async function createTodo({
    reference,
    title,
    definition,
    method,
    location,
    criteria,
    record,
    comments,
    userId
}: Pick<Todo, 'reference' | 'title' | 'definition' | 'method' | 'location' |'criteria' | 'record' | 'comments' | 'userId'>) {
    return await prisma.todo.create({
        data: {
            reference,
            title,
            definition,
            method,
            location,
            criteria,
            record,
            comments,
            userId
        }
    })
}
