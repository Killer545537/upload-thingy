'use client';

import { motion } from 'framer-motion';
import { Clock, Files, type LucideIcon, Star, Trash2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems: { icon: LucideIcon; label: string }[] = [
    { icon: Files, label: 'All Files' },
    { icon: Clock, label: 'Recent' },
    { icon: Star, label: 'Starred' },
    { icon: Trash2, label: 'Trash' },
] as const;

// TODO: Replace with actual routing logic (e.g., usePathname())
const activeItem = 'All Files';

// TODO: Replace with actual storage data from API/database
const usedStorage = 7.2;
const totalStorage = 10;
const storagePercent = Math.round((usedStorage / totalStorage) * 100);

const Sidebar = () => (
    <aside className='fixed left-0 top-0 h-screen w-60 bg-gray-50 border-r border-border flex flex-col z-40'>
        {/* Logo */}
        <div className='p-6 border-b border-border'>
            <div className='flex items-center gap-2'>
                <Logo className='inline-block w-12 h-12' />
                <span className='font-semibold text-foreground tracking-tighter-custom'>
                    UploadThingy
                </span>
            </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4'>
            <ul className='space-y-1'>
                {navItems.map(({ icon: Icon, label }) => (
                    <li key={label}>
                        <Button
                            className={cn(
                                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative',
                                label === activeItem
                                    ? 'bg-gray-100 text-foreground cursor-default hover:bg-gray-100 hover:text-foreground'
                                    : 'bg-gray-50 text-gray-500 hover:text-foreground hover:bg-gray-100/50',
                            )}
                            variant='ghost'
                        >
                            {label === activeItem && (
                                <motion.div
                                    className='absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-foreground rounded-full'
                                    initial={false}
                                    layoutId='sidebar-indicator'
                                    transition={{
                                        damping: 30,
                                        stiffness: 400,
                                        type: 'spring',
                                    }}
                                />
                            )}
                            <Icon className='w-4 h-4' />
                            <span>{label}</span>
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>

        {/* Storage Meter */}
        <div className='p-4 border-t border-border'>
            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <span className='text-[10px] font-mono text-gray-500 uppercase tracking-wider'>
                        Storage
                    </span>
                    <span className='text-[10px] font-mono text-gray-500'>
                        {usedStorage}GB / {totalStorage}GB
                    </span>
                </div>
                <div className='h-1 bg-gray-200 rounded-full overflow-hidden'>
                    <motion.div
                        animate={{ width: `${storagePercent}%` }}
                        className='h-full bg-foreground rounded-full'
                        initial={{ width: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
            </div>
        </div>
    </aside>
);

export default Sidebar;
