export default function TodoList({todos}) {
    return (
        <p>
        todos count is: {todos.length}
        <table className="border-collapse border border-slate-500">
            <thead>
                <tr className="border border-slate-600">
                    <th className="border border-slate-600">Id</th>
                    <th className="border border-slate-600">reference</th>
                    <th className="border border-slate-600">title</th>
                    <th className="border border-slate-600">definition</th>
                    <th className="border border-slate-600">method</th>
                    <th className="border border-slate-600">location</th>
                    <th className="border border-slate-600">criteria</th>
                    <th className="border border-slate-600">comments</th>
                    <th className="border border-slate-600">Created At</th>
                    <th className="border border-slate-600">Updated At</th>
                    <th className="border border-slate-600">User</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.id}>
                        <td className="border border-slate-700 px-3">{todo.id}</td>
                        <td className="border border-slate-700 px-3">{todo.reference.name}</td>
                        <td className="border border-slate-700 px-3">{todo.title}</td>
                        <td className="border border-slate-700 ps-3">{todo.definition}</td>
                        <td className="border border-slate-700 ps-3">{todo.method.name}</td>
                        <td className="border border-slate-700 ps-3">{todo.location}</td>
                        <td className="border border-slate-700 ps-3">{todo.criteria}</td>
                        <td className="border border-slate-700 ps-3">{todo.comments}</td>
                        <td className="border border-slate-700 ps-3">{new Date(todo.createdAt).toLocaleString()}</td>
                        <td className="border border-slate-700 ps-3">{new Date(todo.updatedAt).toLocaleString()}</td>
                        <td className="border border-slate-700 ps-3">{todo.userId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </p>
    )
}