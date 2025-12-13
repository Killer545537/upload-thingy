'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navLinks = [
    { href: '#features', name: 'Features' },
    { href: '#working', name: 'How it Works' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.header
            animate={{ y: 0 }}
            className='fixed top-0 left-0 right-0 z-50 glass-header'
            initial={{ y: -100 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <nav className='container mx-auto px-6 h-16 flex items-center justify-between'>
                {/* Logo */}
                <a
                    className='text-xl font-bold tracking-tighter-custom text-foreground'
                    href='/'
                >
                    Upload Thingy
                </a>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    {navLinks.map((link) => (
                        <a
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors duration-200'
                            href={link.href}
                            key={link.name}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className='hidden md:flex items-center gap-3'>
                    <Button
                        asChild
                        className='rounded-md font-medium transition-all duration-200'
                        variant='ghost'
                    >
                        <Link href='/login'>Log In</Link>
                    </Button>
                    <Button
                        asChild
                        className='rounded-md font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-md'
                    >
                        <Link href='/signup'>Sign Up</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden p-2 text-foreground'
                    onClick={() => setIsOpen(!isOpen)}
                    type='button'
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='md:hidden bg-background border-b border-border'
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                >
                    <div className='container mx-auto px-6 py-4 flex flex-col gap-4'>
                        {navLinks.map((link) => (
                            <a
                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                href={link.href}
                                key={link.name}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Button asChild className='w-full' variant='ghost'>
                            <Link href='/login'>Log In</Link>
                        </Button>
                        <Button asChild className='w-full'>
                            <Link href='/signup'>Sign Up</Link>
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};

export default Navbar;
