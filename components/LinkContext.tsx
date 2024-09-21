"use client"
import React, { createContext, useContext, useState } from 'react';

interface LinkContextType {
    link: string;
    setLink: (link: string) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [link, setLink] = useState<string>("");

    return (
        <LinkContext.Provider value={{ link, setLink }}>
            {children}
        </LinkContext.Provider>
    );
};

export const useLink = () => {
    const context = useContext(LinkContext);
    if (!context) {
        throw new Error("useLink must be used within a LinkProvider");
    }
    return context;
};
