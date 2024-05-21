import type {  Todo } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getTodos() {
    return await prisma.todo.findMany({
        include : {
            reference : true
        }
    });
}

export async function deleteTodo(id: Todo['id']) {
    return await prisma.todo.delete({ where: { id } })
}

export async function getTodoById(id: Todo['id']) {
    return await prisma.todo.findFirst({ 
        where: { id }, 
        include : {
            article : true,
            period : true,
            reference : true
        }
    })
}

export async function createTodo({
    title,
    definition,
    location,
    criteria,
    comments,
    method,
    referenceId,
    userId
}: Pick<Todo, 'title' | 'definition' | 'location' | 'criteria' | 'comments' | 'method' | 'referenceId' | 'userId'>) {
    return await prisma.todo.create({
        data: {
            remark : '',
            title,
            definition,
            method,
            location,
            criteria,
            record : '',
            comments,
            referenceId,
            userId,
            articleId: '',
            periodId: ''
        }
    })
}
