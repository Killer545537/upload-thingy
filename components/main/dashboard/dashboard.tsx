'use client';

import { motion } from 'framer-motion';
import FileCard from './file-card';

const Dashboard = () => (
    <main className='p-6'>
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='mb-6'
            initial={{ opacity: 0, y: 10 }}
        >
            <h1 className='text-2xl font-semibold text-foreground tracking-tight'>
                All Files
            </h1>
        </motion.div>
        <div className='w-36'>
            <FileCard
                id={'idk'}
                mimeType={'PDF'}
                originalName={'Name'}
                sizeInBytes={''}
                starred={true}
            />
        </div>
    </main>
);

export default Dashboard;
