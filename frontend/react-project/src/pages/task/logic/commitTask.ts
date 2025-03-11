import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface";

export async function commitTask(taskId: string, user: IUserWitoutPassword, provide: (url: string) => void) {
  if (user) {
    try {
      const response = await fetch("http://localhost:3001/tasks/commit-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, role: user.role, id: user.id }),
      });

      if (response.ok) {
        provide('/')
      } else {
        console.error("Commit failed");
      }
    } catch (error) {
      console.error("Error committing task:", error);
    }
  }
}