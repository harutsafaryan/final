/* eslint-disable react/jsx-no-leaked-render */
import React from "react"


interface B {
    id: string;
    articleId : string;
    title : string;
    definition : string | null;
    referenceId : string;
    location : string | null;
    criteria : string | null;
    method : string | null;
    comments: string | null;
    record : string | null;
    createdAt: string;
    article : {
        name: string;
    }
    reference : {
        name : string;
    }
}

const  TodoInfo : React.FC<{todo : B | null }> = ({todo}) => {
    if (todo === null)
        return;
    
    return (
        <div>
            {
                todo?.articleId &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Article:</p>
                    <p>{todo?.article.name}</p>
                </div>
            }
            {
                todo?.title &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Title:</p>
                    <p>{todo?.title}</p>
                </div>
            }
            {
                todo?.referenceId &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Reference:</p>
                    <p>{todo?.reference.name}</p>
                </div>
            }
            {
                todo?.definition &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Definition:</p>
                    <p>{todo?.definition}</p>
                </div>
            }
            {
                todo?.location &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Location:</p>
                    <p>{todo?.location}</p>
                </div>
            }
            {
                todo?.criteria &&

                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Criteria:</p>
                    <p>{todo?.criteria}</p>
                </div>
            }
            {
                todo?.method &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Method:</p>
                    <p>{todo?.method}</p>
                </div>
            }
            {
                todo?.record &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Record:</p>
                    <p>{todo?.record}</p>
                </div>
            }
            {
                todo?.comments &&
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                    <p className="italic mr-4 w-16 text-right">Comments:</p>
                    <p>{todo?.comments}</p>
                </div>
            }
            {/* <p className="text-sm font-medium leading-6 text-gray-900">Created: {new Date(todo?.createdAt ?? 0).toLocaleDateString()}</p> */}
        </div>
    )
}

export default TodoInfo