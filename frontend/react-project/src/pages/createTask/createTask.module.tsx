import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './createTask.module.css'

export function CreateTask() {
  const navigate = useNavigate();

  // Состояния для полей формы
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Easy");
  const [tags, setTags] = useState("");
  const [testCases, setTestCases] = useState("");

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Формируем данные для отправки
    const taskData = {
      title,
      description,
      level,
      tags: tags.split(",").map((tag) => tag.trim()),
      test_cases: testCases.split(",").map((testCase) => testCase.trim()),
    };

    try {
      // Отправляем данные на сервер
      const response = await fetch("http://127.0.0.1:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
     
        navigate("/tasks");
      } else {
        console.error("Ошибка при создании задания");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="mt-8 layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#1c110d] text-3xl font-bold mb-6">Create task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Поле для заголовка */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
              required
            />
          </div>

          {/* Поле для описания */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
              rows={4}
              required
            />
          </div>

          {/* Поле для уровня сложности */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Поле для тегов */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
              required
            />
          </div>

          {/* Поле для тестовых случаев */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Testcases (comma separated; E.g yourFunc(1), yourFunc(2) ...)</label>
            <input
              type="text"
              value={testCases}
              onChange={(e) => setTestCases(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
              required
            />
          </div>

          {/* Кнопка отправки формы */}
          <button
            type="submit"
            className="mt-4 hover_orange px-4 py-2 bg-[#f14b0e] text-[#fcf9f8] rounded-md hover:bg-[#e0440d] transition-colors"
          >
            Create task
          </button>
        </form>
      </div>
    </div>
  );
}