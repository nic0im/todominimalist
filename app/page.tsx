"use client"
import { useState } from "react";

interface Tarea {
  nombre: string;
}

export default function Home(): JSX.Element {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState<string>("");

  function displayTareas(): JSX.Element[] | JSX.Element {
    if (tareas.length > 0) {
      return tareas.map((t, index) => (
        <div key={index} className="flex justify-between gap-4 border-b border-b-slate-400"><div  className="min-w-[200px] min-h-[40px] items-center flex">{t.nombre}</div><button onClick={() => deleteTask(index)} className="text-red-300 hover:text-red-600">X</button></div>
      ));
    } else {
      return <div>Sin tareas</div>;
    }
  }

  function agregarTarea(ev: React.FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    if(nuevaTarea.length>0){
      setTareas([...tareas, { nombre: nuevaTarea }]);
      setNuevaTarea("");
    }
  }

  function handleTextareaChange(ev: React.ChangeEvent<HTMLTextAreaElement>): void {
    setNuevaTarea(ev.target.value);
  }

  function deleteTask(index: number): void {
    const updatedTasks = tareas.filter((_, i) => i !== index);
    
    setTareas(updatedTasks);
  }

  return (
    <main className="items-center flex flex-col justify-center h-screen">
      <div className="text-2xl mb-3">To do list</div>
      <form onSubmit={agregarTarea} className="flex justify-between gap-2">
        <textarea
          id="textArea"
          name="tarea"
          className="w-[300px] max-h-[50px] resize-none"
          value={nuevaTarea}
          onChange={handleTextareaChange}
        />
        <button className="border p-1 rounded-sm border-gray-300 hover:bg-gray-300">Agregar Tarea</button>
      </form>
      <div className="mt-2">{displayTareas()}</div>
    </main>
  );
}
