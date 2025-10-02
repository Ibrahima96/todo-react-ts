import { Trash } from "lucide-react";
type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
    id: number;
    text: string;
    priority: Priority;
};

type Props = {
    todo: Todo;
    onDelete: () => void
    isSelected :boolean,
    onToggleSelected:(id:number)=>void
};

const TodoItem = ({ todo ,onDelete,isSelected,onToggleSelected}: Props) => {
    return (
        <>
            {todo.text && (
                <li className="p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary checkbox-sm"
                                checked={isSelected}
                                onChange={()=>onToggleSelected(todo.id)}
                            />
                            <span
                                className="font-bold text-md">
                                <span>{todo.text}</span>
                            </span>
                            <span
                                className={`badge badge-sm badge-soft 
                        ${todo.priority === "Urgente"
                                        ? 'badge-error'
                                        : todo.priority === "Moyenne"
                                            ? 'badge-warning'
                                            : 'badge-success'}`}
                            >
                                {todo.priority}
                            </span>
                        </div>
                        <button className="btn btn-sm  btn-error btn-soft" onClick={onDelete}>
                            <Trash className="size-4" />
                        </button>
                    </div>
                </li>
            )}
        </>
    );
};

export default TodoItem;
