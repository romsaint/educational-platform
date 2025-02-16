import { ReactNode } from "react";

export function Wrap({children}: {children: ReactNode}) {
  return (
    <>
      <div className="relative flex size-full min-h-screen flex-col bg-[#fcf9f8] group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
            {children}
        </div>
      </div>
    </>
  );
}
