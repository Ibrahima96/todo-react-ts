import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { ConstructionIcon } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

function App() {
  // Déclaration des hook pour stocker les valeur des inputs et celle des options
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  //localstorage
  const saveTodos = localStorage.getItem('todos')
  const initialTodos = saveTodos ? JSON.parse(saveTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  //filtrage
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    // on verifie est-ce que le champs n'est pas vide
    if (input.trim() == "") {
      return;
    }
    // Si tout est correct on ajoute les taches
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };

    const newTodos = [newTodo, ...todos];

    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
    console.log(todos);
  };

  let filteredTodos: Todo[] = [];
  // affichons les donners

  if (filter === "Tous") {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }
  //compter tous cequi ce trouve dans chaque  priority
  const urgentCount = todos.filter((t) => t.priority === "Urgente").length
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length
  const lowCount = todos.filter((t) => t.priority === "Basse").length
  const totalCount = todos.length

  //function pour suppression de todos
  const deleteTodos = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id)
    setTodos(newTodo)
  }

  const [selectedTodo, setSelectedTodo] = useState<Set<number>>(new Set())

  const toggleSelectedTodo = (id: number) => {
    const newSelected = new Set(selectedTodo)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTodo(newSelected)
  }
  const finishSelected = () => {
    const newTodos = todos.filter((todos) => {
      if (selectedTodo.has(todos.id)) {
        return false
      }
      return true
    })
    setTodos(newTodos)
    setSelectedTodo(new Set())
  }
  return (
    <div className="flex justify-center">
      <div className="w-2/3 flex flex-col gap-4 bg-base-300 p-6 my-15 rounded-2xl">
        {/* formulaire */}
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajoutée une tache ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="Urgente">Urgente</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button className="btn btn-primary" onClick={addTodo}>
            Ajouter
          </button>
        </div>
        <div className="space-y-2 h-fit flex-1">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <button
                className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
                onClick={() => setFilter('Tous')}
              >
                Tous ({totalCount})
              </button>
              <button
                className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`}
                onClick={() => setFilter('Urgente')}
              >
                Urgente ({urgentCount})
              </button>
              <button
                className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`}
                onClick={() => setFilter('Moyenne')}
              >
                Moyenne ({mediumCount})
              </button>
              <button
                className={`btn btn-soft ${filter === "Basse" ? "btn-primary" : ""}`}
                onClick={() => setFilter('Basse')}
              >
                Basse ({lowCount})
              </button>
            </div>
            <button
              className=" btn btn-primary"
              disabled={selectedTodo.size == 0}
              onClick={finishSelected}
            >Finir la sélection ({selectedTodo.size})
            </button>
          </div>
          {filteredTodos.length > 0 ? (
            <ul
              className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    onDelete={() => deleteTodos(todo.id)}
                    isSelected={selectedTodo.has(todo.id)}
                    onToggleSelected={toggleSelectedTodo}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-5">
              <div>
                <ConstructionIcon strokeWidth={1} className="size-40 text-primary" />
              </div>
              <p className="font-thin text-sm">Aucune Tache pour ce filtre </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
