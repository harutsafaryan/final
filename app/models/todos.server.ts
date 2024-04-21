import type { User, Todo } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getTodos() {
    return await prisma.todo.findMany({
        include : {
            reference : true,
            method : true
        }
    });
}

export async function deleteTodo(id: Todo['id']) {
    return await prisma.todo.delete({ where: { id } })
}

export async function getTodoById(id: Todo['id']) {
    return await prisma.todo.findFirst({ where: { id } })
}

export async function createTodo({
    title,
    definition,
    location,
    criteria,
    comments,
    methodId,
    referenceId,
    userId
}: Pick<Todo, 'title' | 'definition' | 'location' | 'criteria' | 'comments' | 'methodId' | 'referenceId' | 'userId'>) {
    return await prisma.todo.create({
        data: {
            title,
            definition,
            location,
            criteria,
            comments,
            methodId,
            referenceId,
            userId
        }
    })
}
