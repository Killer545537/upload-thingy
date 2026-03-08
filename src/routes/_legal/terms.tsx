import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_legal/terms')({
    component: TermsPage,
});

function TermsPage() {
    return (
        <section className='relative min-h-screen pt-32 pb-20 overflow-hidden hero-gradient'>
            {/* Dot pattern overlay */}
            <div className='absolute inset-0 dot-pattern opacity-[0.03]' />

            <div className='container mx-auto px-6 relative z-10'>
                {/* Header */}
                <div className='text-center max-w-4xl mx-auto mb-16'>
                    <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]'>
                        Terms of Service
                    </h1>
                    <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
                        The rules of the road. Simple and fair.
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
                                Agreement to Terms
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                By accessing or using UploadThingy, you agree to
                                be bound by these Terms of Service. If you
                                disagree with any part of these terms, you may
                                not access our service. These terms apply to all
                                visitors, users, and others who access or use
                                the service.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Use of Service
                            </h2>
                            <p className='text-muted-foreground leading-relaxed mb-4'>
                                You agree to use UploadThingy only for lawful
                                purposes. You are prohibited from:
                            </p>
                            <ul className='list-disc list-inside text-muted-foreground space-y-2'>
                                <li>
                                    Uploading illegal, harmful, or malicious
                                    content
                                </li>
                                <li>
                                    Violating any intellectual property rights
                                </li>
                                <li>
                                    Attempting to gain unauthorized access to
                                    our systems
                                </li>
                                <li>
                                    Distributing malware or engaging in phishing
                                </li>
                                <li>
                                    Using the service for spam or unsolicited
                                    communications
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Account Responsibilities
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                You are responsible for maintaining the
                                confidentiality of your account credentials and
                                for all activities that occur under your
                                account. You must notify us immediately of any
                                unauthorized use of your account. We reserve the
                                right to suspend or terminate accounts that
                                violate these terms.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Content Ownership
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                You retain all ownership rights to the content
                                you upload to UploadThingy. By uploading
                                content, you grant us a limited license to
                                store, process, and display your files solely
                                for the purpose of providing our service to you.
                                We do not claim ownership of your content.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Service Availability
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                We strive to maintain high availability but do
                                not guarantee uninterrupted access to our
                                service. We may temporarily suspend access for
                                maintenance, updates, or circumstances beyond
                                our control. We will make reasonable efforts to
                                notify users of planned downtime.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Limitation of Liability
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                UploadThingy is provided "as is" without
                                warranties of any kind. We shall not be liable
                                for any indirect, incidental, special, or
                                consequential damages arising from your use of
                                the service. Our total liability shall not
                                exceed the amount you paid us in the twelve
                                months preceding the claim.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Termination
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                We may terminate or suspend your account at any
                                time for violations of these terms. Upon
                                termination, your right to use the service
                                ceases immediately. You may also terminate your
                                account at any time by contacting us or through
                                your account settings.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Changes to Terms
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                We reserve the right to modify these terms at
                                any time. We will notify users of significant
                                changes via email or through the service. Your
                                continued use of UploadThingy after changes
                                constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className='text-2xl font-semibold text-foreground mb-4'>
                                Contact Us
                            </h2>
                            <p className='text-muted-foreground leading-relaxed'>
                                If you have any questions about these Terms of
                                Service, please contact us at{' '}
                                <a
                                    className='text-foreground underline hover:no-underline'
                                    href='mailto:legal@uploadthingy.com'
                                >
                                    legal@uploadthingy.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}
