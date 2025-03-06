import { useState } from "react";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Editor from "@uiw/react-codemirror";
import { Output } from "./output";
import Cookies from "js-cookie";
import { ITaskWithoutAnswer } from "../../../interfaces/tasks/taskWithoutAnswer.interface";

export function CodeEditor({task}: {task: ITaskWithoutAnswer | null}) {
  const functionName = 'countStr'
  const [code, setCode] = useState<string>(`function ${functionName}(string) {\n // ...\n}`);
  const [output, setOutput] = useState<string>("// Your code output will appear here");

  

  const onChange = (value: string) => {
    setCode(value);
  };
  
  function runCode() {
    try {
      console.log(Cookies.get(`test_cases_${task?.id}`))
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
      
      <Output output={output} />
    </>
  );
}
