export function Output({ data }: { data: { [any: string]: any } | null }) {
  return (
    <div className="bg-[#f4eae7] rounded p-4">
      <h2 className="text-lg font-bold text-[#1c110d] mb-4">Output</h2>
      <div className="bg-[#fcf9f8] rounded-lg p-4 min-h-20 font-mono text-[#1c110d]">
        {data ? (
          <>
            {!data.ok ? (
              <div className="wrong-answer flex flex-col">
                <h1 className="text-xl text-center text-[#ff6a6a]">
                  {data.msg}
                </h1>
                <div className="test-case flex flex-row">
                  <h1>Test case: </h1>
                  <h1 className="text-bold ml-2">
                    {JSON.stringify(data.testCase)}
                  </h1>
                </div>
                <div className="answers font-bold">
                  Answer: {JSON.stringify(data.answer)}
                </div>
                <div className="user-answer font-bold">
                  Your answer: {data.wrongAnswer}
                </div>
              </div>
            ) : (
              <div className="success">
                <h1 className="text-xl text-center text-[#15c35c]">
                  {data.msg}
                </h1>
                <p>
                  You have solved this problem!!!
                </p>
              </div>
            )}
          </>
        ) : (
          <h1 className="text-center">
            Run code to see output here
          </h1>
        )}
      </div>
    </div>
  );
}
