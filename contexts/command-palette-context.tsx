'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

interface CommandPaletteContextType {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const CommandPaletteContext = createContext<
    CommandPaletteContextType | undefined
>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <CommandPaletteContext.Provider value={{ close, isOpen, open, toggle }}>
            {children}
        </CommandPaletteContext.Provider>
    );
}

export function useCommandPalette() {
    const context = useContext(CommandPaletteContext);
    if (context === undefined) {
        throw new Error(
            'useCommandPalette must be used within a CommandPaletteProvider',
        );
    }
    return context;
}
