import { CodeEditor } from "./codeEditor";
import { Output } from "./output";

export function MainContent() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 pl-4">
        <div className="mx-auto">
          <h1 className="text-3xl text-center font-bold text-[#1c110d] mb-8">JavaScript Functions</h1>
          <CodeEditor />
          <Output />
        </div>
      </div>
    </div>
  );
}