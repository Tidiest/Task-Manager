import Database from "better-sqlite3"

export interface Task
{
    id:number,
    title:string,
    description:string | null,
    completed:boolean,
    created_at: string
}

export function openDb()
{
    
}