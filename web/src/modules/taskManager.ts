import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];
let newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;

export function initializeTasks() {
    tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
    return tasks.filter(task => !task.completed);
}

export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
    return tasks;
}

export function completeTask(taskTitle: string): void {
    const taskIndex = tasks.findIndex(task => task.title === taskTitle);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;

        const currentGroup = tasks[taskIndex].group;

        
        const allCurrentGroupTasksCompleted = tasks
            .filter(task => task.group === currentGroup)
            .every(task => task.completed);

        
        if (allCurrentGroupTasksCompleted) {
            
            const nextGroupTasks = tasks.filter(task => task.group === currentGroup + 1);
            nextGroupTasks.forEach(task => {
                if (!task.completed) {
                    task.completed = false; 
                }
            });
        }
    }
}


export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTask = new Task(newId++, title, description, persona, group, false);
    tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    }
}

export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
}
