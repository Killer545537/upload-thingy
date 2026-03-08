import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_legal/privacy')({
    component: PrivacyPage,
});

function PrivacyPage() {
    return (
        <section className='relative min-h-screen pt-32 pb-20 overflow-hidden hero-gradient'>
            {/* Dot pattern overlay */}
            <div className='absolute inset-0 dot-pattern opacity-[0.03]' />

            <div className='container mx-auto px-6 relative z-10'>
                {/* Header */}
                <div className='text-center max-w-4xl mx-auto mb-16'>
                    <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]'>
                        Privacy Policy
                    </h1>
                    <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Your privacy matters. Here's how we protect it.
                    </p>
                    <p className='text-sm text-muted-foreground mt-4'>
                        Last updated: March 2026
                    </p>
                </div>

                {/* Content */}
                <div className='max-w-3xl mx-auto prose prose-neutral dark:prose-invert'>
                    <div className='bg-card border border-border rounded-2xl p-8 md:p-12 space-y-8'>
                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Introduction
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                At UploadThingy, we take your privacy seriously.
                                This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information
                                when you use our file storage service. Please
                                read this policy carefully to understand our
                                practices regarding your personal data.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Information We Collect
                            </h2>
                            <p className='text-muted-foreground leading-relaxed mb-4'>
                                We collect information that you provide directly
                                to us, including:
                            </p>
                            <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                                <li>
                                    Account information (email address, name)
                                </li>
                                <li>
                                    Files and content you upload to our service
                                </li>
                                <li>
                                    Usage data and interaction with our platform
                                </li>
                                <li>Device and browser information</li>
                                <li>IP address and location data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                How We Use Your Information
                            </h2>
                            <p className='text-muted-foreground leading-relaxed mb-4'>
                                We use the information we collect to:
                            </p>
                            <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                                <li>
                                    Provide, maintain, and improve our services
                                </li>
                                <li>
                                    Process transactions and send related
                                    information
                                </li>
                                <li>
                                    Send technical notices and security alerts
                                </li>
                                <li>Respond to your comments and questions</li>
                                <li>
                                    Protect against fraudulent or illegal
                                    activity
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Data Security
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                We implement industry-standard security measures
                                to protect your data. All files are encrypted
                                using AES-256 encryption both in transit and at
                                rest. We regularly audit our security practices
                                and maintain strict access controls to ensure
                                your files remain private and secure.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Data Retention
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                We retain your personal information for as long
                                as your account is active or as needed to
                                provide you services. You can request deletion
                                of your data at any time by contacting us or
                                through your account settings.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Your Rights
                            </h2>
                            <p className='text-muted-foreground leading-relaxed mb-4'>
                                You have the right to:
                            </p>
                            <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Export your data in a portable format</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Contact Us
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                If you have any questions about this Privacy
                                Policy, please contact us at{' '}
                                <a
                                    className='text-foreground underline hover:no-underline'
                                    href='mailto:privacy@uploadthingy.com'
                                >
                                    privacy@uploadthingy.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
