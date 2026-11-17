import Database from "better-sqlite3";

export interface Task
{
    id:number,
    title:string,
    description:string | null,
    completed:number,
    created_at: string
}

export function openDb() : Database.Database
{
    const db = new Database("app.db", {verbose:console.log})
    return db;
}

export function getTasks(db:Database.Database) : Task[]
{
    const statement = db.prepare("SELECT * FROM Tasks");
    const tasks = statement.all() as Task[];
    return tasks;
}

export function getTaskById(db:Database.Database, id:number): Task | undefined
{
    const stmt = db.prepare("SELECT * FROM Tasks WHERE id = ?");
    const task = stmt.get(id) as Task | undefined;
    return task;
}

export function insertTask(db:Database.Database, newTask:Task)
{
    const stmt = db.prepare("INSERT INTO Tasks (title, description, completed) VALUES (?, ?, ?)");
    const result = stmt.run(newTask.title, newTask.description, newTask.completed);
}

export function updateTask(db:Database.Database, updatedTask:Task)
{
    const stmt = db.prepare("UPDATE Tasks SET title = ?, description = ?, completed = ? WHERE id = ?");
    stmt.run(updatedTask.title, updatedTask.description, updatedTask.completed, updatedTask.id);
}

export function deleteTask(db:Database.Database, id:number)
{
    const stmt = db.prepare("DELETE FROM Tasks WHERE id = ?");
    stmt.run(id);
}