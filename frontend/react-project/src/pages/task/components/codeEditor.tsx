import { useEffect, useState } from "react";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Editor from "@uiw/react-codemirror";
import { Output } from "./output";
import Cookies from "js-cookie";
import { ITaskWithoutAnswer } from "../../../interfaces/tasks/taskWithoutAnswer.interface";
import { fetchRunCode } from "../logic/fetchRunCode";

export function CodeEditor({task}: {task: ITaskWithoutAnswer | null}) {
  const codeCookie = Cookies.get(`code_${task?.id}`)
  const [code, setCode] = useState<string>(codeCookie ? codeCookie : `function myFn() {\n \n}`);
  const [output, setOutput] = useState<string>("// Your code output will appear here");
  const [data, setData] = useState<{[any: string]: any} | null>(null);
  const [user, setUser] = useState<{[any: string]: any} | null>(null);

  useEffect(() => {
    const user = Cookies.get('user')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  useEffect(() => {
    Cookies.set(`code_${task?.id}`, code)
  }, [code])
  const onChange = (value: string) => {
    setCode(value);
  };
  
  async function runCode() {
    try {
      const testCases = Cookies.get(`test_cases_${task?.id}`)
      if(testCases && task?.id && user) {
        const res = await fetchRunCode(code, testCases, task?.id, user.id)
        Cookies.set(`answer_${task?.id}`, res)
        setData(res)
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <div className="bg-[#f4eae7] rounded p-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#1c110d]">Your Code</h2>
          <button
            onClick={runCode}
            className="hover_orange px-4 py-2 bg-[#f14b0e] text-white rounded-lg hover:bg-[#d43d0a] transition-all"
          >
            Run Code
          </button>
        </div>
        <Editor
          value={code}
          height="300px"
          theme={oneDark}
          extensions={[basicSetup, javascript({ jsx: true })]}
          onChange={onChange}
        />
      </div>
      
      <Output data={data} />
    </>
  );
}
