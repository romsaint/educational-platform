import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import { Error } from "../../components/erorr";
import { CodeEditor } from "./components/codeEditor";

export function CreateTask() {
  const navigate = useNavigate();
  const [ error, setError ] = useState<null | string>(null);
  const [user, setUser ] = useState<{ [key: string]: any } | undefined>(undefined);

  useEffect(() => {
    const data = Cookie.get('user');
    if (data) {
      setUser (JSON.parse(data));
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Easy");
  const [tags, setTags] = useState("");
  const [testCases, setTestCases] = useState("");
  const [answer, setAnswer] = useState("");

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Формируем данные для отправки
    const taskData = {
      title,
      description,
      level,
      tags,
      testCases,
      answer,
      user,
    };

    try {
      // Отправляем данные на сервер
      const response = await fetch("http://127.0.0.1:3001/tasks/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
    
      if (data.ok) {
        navigate("/tasks");
        window.location.reload()
      } else {
        setError(data.msg);
      }
    } catch (error) {
      setError('Error');
    }
  };


  return (
    <div className="px-40 justify-center py-5">
      <div className="mt-8 layout-content-container flex flex-col flex-1">
        {error ? (
          <Error message={error} setErr={setError} />
        ) : ""}
        <h1 className="text-[#1c110d] text-3xl font-bold mb-6 text-center">Create task</h1>
        {user === undefined ? "" : user?.role === 'USER' ? (
          <h1 className="text-center text-2xl">Access denied, you are not an admin or moderator</h1>
        ) :
        (
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

          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Testcases (comma separated; E.g [1, 2, 3], [15, 5, 23])</label>
            <input
              type="text"
              value={testCases}
              onChange={e => setTestCases(e.target.value)}
              className="px-3 py-2 rounded-md bg-[#f4eae7] text-[#1c110d] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#1c110d] text-sm font-medium">Answer (e.g function minElInArray() ={">"} ...)</label>
            <CodeEditor setAnswer={setAnswer} />
          </div>

          <button
            type="submit"
            className="mt-4 hover_orange px-4 py-2 bg-[#f14b0e] text-[#fcf9f8] rounded-md hover:bg-[#e0440d] transition-colors"
          >
            Create task
          </button>
        </form>
        )}
        
      </div>
    </div>
  );
}