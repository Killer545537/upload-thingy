'use client';

import { CommandPalette } from '@/components/main/command-palette';
import Header from '@/components/main/header';
import Sidebar from '@/components/main/sidebar';
import {
    CommandPaletteProvider,
    useCommandPalette,
} from '@/contexts/command-palette-context';

function MainLayoutContent({ children }: { children: React.ReactNode }) {
    const { isOpen, open, close } = useCommandPalette();

    const handleOpenChange = (value: boolean) => {
        if (value) {
            open();
        } else {
            close();
        }
    };

    return (
        <>
            <div className='min-h-screen flex bg-background'>
                <Sidebar />

                <div className='flex-1 ml-60'>
                    <Header onSearchClick={open} />
                    {children}
                </div>
            </div>

            <CommandPalette onOpenChange={handleOpenChange} open={isOpen} />
        </>
    );
}

export function MainLayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <CommandPaletteProvider>
            <MainLayoutContent>{children}</MainLayoutContent>
        </CommandPaletteProvider>
    );
}
