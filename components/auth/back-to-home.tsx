'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const BackToHome = () => (
    <motion.div
        animate={{ opacity: 1, x: 0 }}
        className='absolute top-6 left-6 z-10'
        initial={{ opacity: 0, x: -20 }}
        transition={{ delay: 0.2 }}
    >
        <Link href='/'>
            <Button
                className='gap-2 text-muted-foreground hover:text-foreground'
                variant='ghost'
            >
                <ArrowLeft className='h-4 w-4' />
                Back to Home
            </Button>
        </Link>
    </motion.div>
);

export default BackToHome;
