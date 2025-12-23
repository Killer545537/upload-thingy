'use client';

import { motion } from 'framer-motion';
import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserAvatarProps {
    userName: string;
    userEmail: string;
}

const UserAvatar = ({ userName, userEmail }: UserAvatarProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const initials = userName
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='focus:outline-none' type='button'>
                    <Avatar className='w-10 h-10 bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-300 transition-colors overflow-hidden cursor-pointer'>
                        {initials}
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='w-80 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl bg-background/90'
                sideOffset={8}
            >
                {/* Header */}
                <DropdownMenuLabel className='p-4'>
                    <p className='font-medium text-foreground'>{userName}</p>
                    <p className='text-sm text-muted-foreground font-normal'>
                        {userEmail}
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Menu Items */}
                <div className='p-2'>
                    <div
                        className='relative'
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        role='none'
                    >
                        {hoveredIndex === 0 && (
                            <motion.div
                                className='absolute inset-0 bg-accent rounded-md'
                                initial={false}
                                layoutId='spotlight'
                                transition={{
                                    damping: 30,
                                    stiffness: 400,
                                    type: 'spring',
                                }}
                            />
                        )}
                        <DropdownMenuItem className='relative z-10 cursor-pointer'>
                            <Settings className='w-4 h-4 text-muted-foreground' />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* Log Out */}
                <div className='p-2'>
                    <div
                        className='relative'
                        onMouseEnter={() => setHoveredIndex(1)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        role='none'
                    >
                        {hoveredIndex === 1 && (
                            <motion.div
                                className='absolute inset-0 bg-accent rounded-md'
                                initial={false}
                                layoutId='spotlight'
                                transition={{
                                    damping: 30,
                                    stiffness: 400,
                                    type: 'spring',
                                }}
                            />
                        )}
                        <DropdownMenuItem
                            className='relative z-10 cursor-pointer group'
                            variant='destructive'
                        >
                            <LogOut className='w-4 h-4' />
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatar;
