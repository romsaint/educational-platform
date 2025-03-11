import { useState } from "react";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Editor from "@uiw/react-codemirror";

export function CodeEditor({setAnswer}: {setAnswer: (val: string) => void}) {
  const [code, setCode] = useState<string>(
    `function myFn() {\n \n}`
  );
 
  const onChange = (value: string) => {
    setAnswer(value)
    setCode(value);
  };

  return (
    <>
      <Editor
        value={code}
        height="250px"
        theme={oneDark}
        extensions={[basicSetup, javascript({ jsx: true })]}
        onChange={onChange}
      />
    </>
  );
}
