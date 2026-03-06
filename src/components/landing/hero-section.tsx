import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
    Archive,
    ArrowRight,
    FileText,
    Image,
    Music,
    Video,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';

const Hero = () => {
    const [email, setEmail] = useState('');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    // Pre-create all file transforms at component level (8 files total)
    const fileTransform0X = useTransform(mouseX, [-300, 300], [0, 0]);
    const fileTransform0Y = useTransform(mouseY, [-300, 300], [0, 0]);
    const fileTransform1X = useTransform(mouseX, [-300, 300], [-2, 2]);
    const fileTransform1Y = useTransform(mouseY, [-300, 300], [0, 0]);
    const fileTransform2X = useTransform(mouseX, [-300, 300], [-4, 4]);
    const fileTransform2Y = useTransform(mouseY, [-300, 300], [0, 0]);
    const fileTransform3X = useTransform(mouseX, [-300, 300], [-6, 6]);
    const fileTransform3Y = useTransform(mouseY, [-300, 300], [0, 0]);
    const fileTransform4X = useTransform(mouseX, [-300, 300], [0, 0]);
    const fileTransform4Y = useTransform(mouseY, [-300, 300], [-2, 2]);
    const fileTransform5X = useTransform(mouseX, [-300, 300], [-2, 2]);
    const fileTransform5Y = useTransform(mouseY, [-300, 300], [-2, 2]);
    const fileTransform6X = useTransform(mouseX, [-300, 300], [-4, 4]);
    const fileTransform6Y = useTransform(mouseY, [-300, 300], [-2, 2]);
    const fileTransform7X = useTransform(mouseX, [-300, 300], [-6, 6]);
    const fileTransform7Y = useTransform(mouseY, [-300, 300], [-2, 2]);

    const fileTransforms = [
        { x: fileTransform0X, y: fileTransform0Y },
        { x: fileTransform1X, y: fileTransform1Y },
        { x: fileTransform2X, y: fileTransform2Y },
        { x: fileTransform3X, y: fileTransform3Y },
        { x: fileTransform4X, y: fileTransform4Y },
        { x: fileTransform5X, y: fileTransform5Y },
        { x: fileTransform6X, y: fileTransform6Y },
        { x: fileTransform7X, y: fileTransform7Y },
    ];

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section className='relative min-h-screen pt-32 overflow-hidden hero-gradient'>
            {/* Dot pattern overlay */}
            <div className='absolute inset-0 dot-pattern opacity-[0.03]' />

            <div className='container mx-auto px-6 relative z-10'>
                {/* Hero Text */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center max-w-4xl mx-auto mb-12'
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h1 className='text-5xl md:text-7xl font-bold tracking-tight-custom text-foreground mb-6 leading-[1.1]'>
                        File storage, distilled to perfection.
                    </h1>
                    <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10'>
                        The simplest way to upload, secure, and retrieve your
                        digital assets. No bloat. Just storage.
                    </p>

                    {/* Email Input CTA */}
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className='flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto'
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Input
                            className='h-12 px-4 bg-background border-border rounded-lg text-foreground placeholder:text-muted-foreground w-full sm:w-auto flex-1'
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email@address.com'
                            type='email'
                            value={email}
                        />
                        <Button className='h-12 px-6 rounded-lg font-medium group w-full sm:w-auto'>
                            Get Started
                            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Hero Dashboard Visual */}
                <motion.div
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className='relative max-w-5xl mx-auto perspective-1000'
                    initial={{ opacity: 0, scale: 0.95, y: 60 }}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className='bg-card border border-border rounded-2xl shadow-2xl overflow-hidden'
                        style={{ rotateX, rotateY }}
                        transition={{
                            damping: 30,
                            stiffness: 100,
                            type: 'spring',
                        }}
                    >
                        {/* Dashboard Header */}
                        <div className='flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30'>
                            <div className='flex gap-1.5'>
                                <div className='w-3 h-3 rounded-full bg-gray-300' />
                                <div className='w-3 h-3 rounded-full bg-gray-300' />
                                <div className='w-3 h-3 rounded-full bg-gray-300' />
                            </div>
                            <div className='flex-1 flex justify-center'>
                                <div className='bg-secondary px-4 py-1 rounded-md text-xs text-muted-foreground'>
                                    uploadthingy.com/dashboard
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className='p-6 bg-linear-to-b from-secondary/20 to-background'>
                            {/* Top Bar */}
                            <div className='flex items-center justify-between mb-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-8 h-8 rounded-lg bg-foreground flex items-center justify-center'>
                                        <span className='text-primary-foreground text-xs font-bold'>
                                            U
                                        </span>
                                    </div>
                                    <span className='font-semibold text-foreground'>
                                        My Files
                                    </span>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='px-3 py-1.5 bg-secondary rounded-md text-xs text-muted-foreground'>
                                        All Files
                                    </div>
                                    <div className='px-3 py-1.5 bg-foreground text-primary-foreground rounded-md text-xs font-medium'>
                                        + Upload
                                    </div>
                                </div>
                            </div>

                            {/* File Grid */}
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                {[
                                    {
                                        icon: FileText,
                                        name: 'presentation.pdf',
                                        size: '2.4 MB',
                                    },
                                    {
                                        icon: Image,
                                        name: 'hero-image.png',
                                        size: '4.1 MB',
                                    },
                                    {
                                        icon: Archive,
                                        name: 'project.zip',
                                        size: '156 MB',
                                    },
                                    {
                                        icon: Video,
                                        name: 'demo-video.mp4',
                                        size: '89 MB',
                                    },
                                    {
                                        icon: Music,
                                        name: 'podcast.mp3',
                                        size: '45 MB',
                                    },
                                    {
                                        icon: Archive,
                                        name: 'design-assets.zip',
                                        size: '234 MB',
                                    },
                                    {
                                        icon: Image,
                                        name: 'team-photo.jpg',
                                        size: '3.2 MB',
                                    },
                                    {
                                        icon: FileText,
                                        name: 'report-final.pdf',
                                        size: '1.8 MB',
                                    },
                                ].map((file, index) => (
                                    <motion.div
                                        animate={{ opacity: 1, y: 0 }}
                                        className='bg-card border border-border rounded-xl p-4 hover:border-gray-300 transition-colors cursor-pointer group'
                                        initial={{ opacity: 0, y: 20 }}
                                        key={file.name}
                                        style={fileTransforms[index] ?? {}}
                                        transition={{
                                            delay: 0.6 + index * 0.05,
                                            duration: 0.4,
                                        }}
                                    >
                                        <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors'>
                                            <file.icon className='w-5 h-5 text-muted-foreground' />
                                        </div>
                                        <p className='text-sm font-medium text-foreground truncate'>
                                            {file.name}
                                        </p>
                                        <p className='text-xs text-muted-foreground mt-1'>
                                            {file.size}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Decorative shadow */}
                    <div className='absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-foreground/5 blur-2xl rounded-full' />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
