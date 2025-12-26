'use client';

import { motion } from 'framer-motion';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';

interface UserAvatarProps {
    // Accept optional props so component can be reused in different contexts.
    // If props are not provided, session data will be used.
    userName?: string;
    userEmail?: string;
}

export default function UserAvatar({ userName, userEmail }: UserAvatarProps) {
    const { data: session, isPending } = authClient.useSession();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();

    // Prefer explicit props, then fallback to session values
    const name = userName ?? session?.user?.name ?? 'User';
    const email = userEmail ?? session?.user?.email ?? '';

    const initials = name
        .split(' ')
        .map((n) => n?.[0] ?? '')
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/login');
                    toast.success('Logged out successfully');
                },
            },
        });
    };

    const avatarContent = isPending ? (
        <div className='w-10 h-10 rounded-full bg-gray-200 animate-pulse' />
    ) : (
        <Avatar className='w-10 h-10 bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-300 transition-colors overflow-hidden cursor-pointer'>
            {initials}
        </Avatar>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label='Open user menu'
                    className='rounded-full p-0'
                    size='icon'
                    variant='ghost'
                >
                    {avatarContent}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align='end'
                className='w-80 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl bg-background/90'
                sideOffset={8}
            >
                <DropdownMenuLabel className='p-4'>
                    <p className='font-medium text-foreground'>{name}</p>
                    <p className='text-sm text-muted-foreground font-normal'>
                        {email}
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Settings */}
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

                        <DropdownMenuItem
                            asChild
                            className='relative z-10 cursor-pointer p-0'
                        >
                            <Button
                                asChild
                                className='w-full justify-start'
                                variant='ghost'
                            >
                                <Link
                                    className='flex items-center gap-2'
                                    href='/settings'
                                >
                                    <Settings className='w-4 h-4 text-muted-foreground' />
                                    <span>Settings</span>
                                </Link>
                            </Button>
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
                            asChild
                            className='relative z-10 cursor-pointer group p-0'
                            variant='destructive'
                        >
                            <Button
                                className='w-full justify-start text-destructive hover:text-destructive'
                                onClick={handleLogout}
                                variant='ghost'
                            >
                                <LogOut className='w-4 h-4' />
                                <span>Log Out</span>
                            </Button>
                        </DropdownMenuItem>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
