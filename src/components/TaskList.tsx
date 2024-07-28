import React, { useState } from 'react';
import { Task } from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updatedTask: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask, onCompleteTask }) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Partial<Task>>({});

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTask(task);
  };

  const handleSaveClick = () => {
    if (editingTaskId) {
      onUpdateTask(editingTaskId, editingTask);
      setEditingTaskId(null);
      setEditingTask({});
    }
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {editingTaskId === task.id ? (
            <div>
              <input
                type="text"
                value={editingTask.title || ''}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              />
              <textarea
                value={editingTask.description || ''}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={() => { setEditingTaskId(null); setEditingTask({}); }}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => onCompleteTask(task.id)}>Complete</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
