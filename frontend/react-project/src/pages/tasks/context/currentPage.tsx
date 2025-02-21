import { createContext, ReactNode, useState } from "react";

export interface ICurrentPageContext { 
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
export const CurrentPageContext = createContext<ICurrentPageContext | undefined>(undefined)

export function CurrentPageProvider({ children }: { children: ReactNode }) {
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <CurrentPageContext.Provider value={{currentPage, setCurrentPage}}>
            {children}
        </CurrentPageContext.Provider>
    )
}