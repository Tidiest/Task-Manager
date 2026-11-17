import {type Task, openDb, getTasks, getTaskById, insertTask, updateTask, deleteTask} from "./repoSqlite.js"
import * as readline from "node:readline/promises"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const db = openDb();
console.log("Opened db " + db);

const tasks = getTasks(db);
console.log("Tasks: " + tasks);

// Get a specific course by ID
const taskId = await rl.question("Enter task ID: ");
const task = getTaskById(db, parseInt(taskId));
if (task) 
{
    console.log("Task found:");
    console.log(task);
} else 
    {
    console.log("Task not found.");
}

const choice = await rl.question("Do you want to add a new task? (y/n): ")
if(choice==='y')
{
    const taskTitle = await rl.question("Task name: ");
    const taskDesc = await rl.question("Task description: ");
    const taskCompleted = parseInt(await rl.question("Task completed(0,1):"));
    const newTask:Task = {
        id: 0,
        title: taskTitle,
        description: taskDesc,
        completed: taskCompleted,
        created_at: ""
    }
    insertTask(db,newTask);
    console.log("Added new task.");
    
}

const deleteQuestion = await rl.question("Do you want to delete a task? (y/n): ");
if (deleteQuestion === 'y') {
    const deleteId = await rl.question("Enter task id to delete: ");
    const idToDelete = parseInt(deleteId);
    const taskToDelete = getTaskById(db, idToDelete);
    if (taskToDelete) {
        deleteTask(db, idToDelete);
        console.log("Task deleted.");
    } else {
        console.log("Task not found.");
    }
}

const updateQuestion = await rl.question("Do you want to update a task? (y/n): ");
if (updateQuestion === 'y') {
    const updateId = await rl.question("Enter task id tp update: ");
    const idToUpdate = parseInt(updateId);
    const taskToUpdate = getTaskById(db, idToUpdate);
    if (taskToUpdate) {
        const newTitle = (  await rl.question("Enter new task title: ")) || taskToUpdate.title;
        const newDesc = (await rl.question("Enter new task description: ")) || taskToUpdate.description;
        const newCompleted = parseInt(await rl.question("Enter task completed status: "))|| taskToUpdate.completed;
        const updatedCourse: Task = {
            id: idToUpdate,
            title: newTitle,
            description: newDesc,
            completed: newCompleted,
            created_at: taskToUpdate.created_at
        };
        updateTask(db, updatedCourse);
        console.log("Task updated");
    } else {
        console.log("Task not found.");
    }
}
rl.close();