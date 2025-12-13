'use client';

import { motion } from 'framer-motion';

const Footer = () => {
    const footerLinks = {
        legal: [
            { href: '/privacy', name: 'Privacy' },
            { href: '/terms', name: 'Terms' },
        ],
    };

    return (
        <footer className='bg-secondary/50 border-t border-border' id='pricing'>
            <div className='container mx-auto px-6 py-16'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-12'>
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <a
                            className='text-xl font-bold tracking-tighter-custom text-foreground'
                            href='/'
                        >
                            Upload Thingy
                        </a>
                        <p className='text-sm text-muted-foreground mt-1'>
                            Designed for simplicity.
                        </p>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <ul className='flex items-center gap-6'>
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                        href={link.href}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-8 border-t border-border'>
                    <p className='text-sm text-muted-foreground text-center'>
                        © 2025 Upload Thingy. Crafted with care.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
