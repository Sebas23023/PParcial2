import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { Task } from '../models/Task';

const taskCollection = collection(db, 'tasks');

export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(taskCollection, where('userId', '==', userId));
  const taskSnapshot = await getDocs(q);
  return taskSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Task[];
};

export const createTask = async (task: Task): Promise<string> => {
  const docRef = await addDoc(taskCollection, {
    title: task.title,
    description: task.description,
    completed: task.completed,
    userId: task.userId
  });
  return docRef.id;
};

export const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<void> => {
  const taskDoc = doc(db, 'tasks', id);
  await updateDoc(taskDoc, updatedTask);
};

export const deleteTask = async (id: string): Promise<void> => {
  const taskDoc = doc(db, 'tasks', id);
  await deleteDoc(taskDoc);
};
