"use client"; // Importante para que funcione con Next.js 13

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/useAuth'; // Hook personalizado para obtener el usuario autenticado
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { Task } from '../models/Task';
import { useRouter } from 'next/navigation'; // Importa useRouter desde next/navigation

const HomePage: React.FC = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirige a la página de login si el usuario no está autenticado
      return;
    }

    async function fetchTasks() {
      if (!user) return; // Verificar nuevamente que el usuario exista
      const taskData = await getTasks(user.uid); // Filtrar tareas por usuario
      const formattedTasks: Task[] = taskData.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed || false,
        userId: task.userId
      }));
      setTasks(formattedTasks);
    }

    fetchTasks();
  }, [user, router]);

  const handleCreateTask = async (title: string, description: string) => {
    if (!user) return;
    const id = await createTask(new Task('', title, description, false, user.uid));
    setTasks([...tasks, new Task(id, title, description, false, user.uid)]);
  };

  const handleUpdateTask = async (id: string, updatedTask: Partial<Task>) => {
    await updateTask(id, updatedTask);
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = async (id: string) => {
    await updateTask(id, { completed: true });
    setTasks(tasks.filter(task => task.id !== id)); // Remover la tarea de la lista de tareas visibles
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <h1>Task Management</h1>
      {user ? (
        <>
          <TaskForm onCreateTask={handleCreateTask} />
          <TaskList 
            tasks={tasks.filter(task => !task.completed)} // Solo mostrar tareas no completadas
            onUpdateTask={handleUpdateTask} 
            onDeleteTask={handleDeleteTask} 
            onCompleteTask={handleCompleteTask} 
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
