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

// const deleteQuestion = await rl.question("Czy chcesz usunąć kurs? (t/n): ");
// if (deleteQuestion === 't') {
//     const deleteId = await rl.question("Podaj ID kursu do usunięcia: ");
//     const idToDelete = parseInt(deleteId);
//     const courseToDelete = getCourseById(db, idToDelete);
//     if (courseToDelete) {
//         deleteCourse(db, idToDelete);
//         console.log("Kurs usunięty!");
//     } else {
//         console.log("Kurs nie znaleziony.");
//     }
// }
// const updateQuestion = await rl.question("Czy chcesz zaktualizować kurs? (t/n): ");
// if (updateQuestion === 't') {
//     const updateId = await rl.question("Podaj ID kursu do aktualizacji: ");
//     const idToUpdate = parseInt(updateId);
//     const courseToUpdate = getCourseById(db, idToUpdate);
//     if (courseToUpdate) {
//         const newTitle = (  await rl.question("Podaj nową nazwę kursu: ")) || courseToUpdate.title;
//         const newPrice = parseFloat(await rl.question("Podaj nową cenę kursu: ")) || courseToUpdate.price;
//         const newDate = await rl.question("Podaj nową datę kursu: YYYY-MM-DD ")|| courseToUpdate.date_start;
//         const updatedCourse: Course = {
//             id: idToUpdate,
//             title: newTitle,
//             price: newPrice,
//             date_start: newDate
//         };
//         updateCourse(db, updatedCourse);
//         console.log("Kurs zaktualizowany!");
//     } else {
//         console.log("Kurs nie znaleziony.");
//     }
// }
rl.close();