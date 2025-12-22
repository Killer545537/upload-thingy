'use client';

import { motion } from 'framer-motion';
import {
    Clock,
    CreditCard,
    FileText,
    type LucideIcon,
    Settings,
    Star,
    Trash2,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from '@/components/ui/command';

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Command {
    icon: LucideIcon;
    label: string;
    shortcut: string;
    category: 'Navigation' | 'Actions';
    onSelect: () => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const handleClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    const commands: Command[] = [
        {
            category: 'Navigation',
            icon: FileText,
            label: 'All Files',
            onSelect: () => {
                console.log('Navigate to: All Files');
                handleClose();
            },
            shortcut: 'G F',
        },
        {
            category: 'Navigation',
            icon: Clock,
            label: 'Recent Files',
            onSelect: () => {
                console.log('Navigate to: Recent Files');
                handleClose();
            },
            shortcut: 'G R',
        },
        {
            category: 'Navigation',
            icon: Star,
            label: 'Starred Files',
            onSelect: () => {
                console.log('Navigate to: Starred Files');
                handleClose();
            },
            shortcut: 'G S',
        },
        {
            category: 'Navigation',
            icon: Trash2,
            label: 'Trash',
            onSelect: () => {
                console.log('Navigate to: Trash');
                handleClose();
            },
            shortcut: 'G T',
        },
        {
            category: 'Actions',
            icon: Settings,
            label: 'Settings',
            onSelect: () => {
                console.log('Open: Settings');
                handleClose();
            },
            shortcut: 'G ,',
        },
        {
            category: 'Actions',
            icon: CreditCard,
            label: 'Billing',
            onSelect: () => {
                console.log('Open: Billing');
                handleClose();
            },
            shortcut: 'G B',
        },
    ];

    const navigationCommands = commands.filter(
        (cmd) => cmd.category === 'Navigation',
    );
    const actionCommands = commands.filter((cmd) => cmd.category === 'Actions');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                onOpenChange(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onOpenChange]);

    return (
        <CommandDialog
            className='top-[20%] translate-y-0'
            description='Quick access to navigation and actions'
            onOpenChange={onOpenChange}
            open={open}
            showCloseButton={false}
            title='Command Palette'
        >
            <CommandInput placeholder='Search commands...' />
            <CommandList>
                <CommandEmpty>No commands found.</CommandEmpty>

                <CommandGroup heading='Navigation'>
                    {navigationCommands.map((cmd) => (
                        <CommandItem
                            className='group relative'
                            key={cmd.label}
                            onSelect={cmd.onSelect}
                        >
                            <motion.div
                                className='absolute inset-0 bg-accent rounded-sm opacity-0 group-data-[selected=true]:opacity-100'
                                initial={false}
                                transition={{
                                    damping: 30,
                                    stiffness: 400,
                                    type: 'spring',
                                }}
                            />
                            <cmd.icon className='relative z-10' />
                            <span className='relative z-10'>{cmd.label}</span>
                            <CommandShortcut className='relative z-10'>
                                {cmd.shortcut}
                            </CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandGroup heading='Actions'>
                    {actionCommands.map((cmd) => (
                        <CommandItem
                            className='group relative'
                            key={cmd.label}
                            onSelect={cmd.onSelect}
                        >
                            <motion.div
                                className='absolute inset-0 bg-accent rounded-sm opacity-0 group-data-[selected=true]:opacity-100'
                                initial={false}
                                transition={{
                                    damping: 30,
                                    stiffness: 400,
                                    type: 'spring',
                                }}
                            />
                            <cmd.icon className='relative z-10' />
                            <span className='relative z-10'>{cmd.label}</span>
                            <CommandShortcut className='relative z-10'>
                                {cmd.shortcut}
                            </CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
