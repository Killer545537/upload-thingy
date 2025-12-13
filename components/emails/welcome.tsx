import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

const WelcomeEmail = ({ name }: { name: string }) => {
    return (
        <Html dir='ltr' lang='en'>
            <Tailwind>
                <Head />
                <Preview>
                    Welcome to UploadThingy - Your modern file upload solution
                </Preview>
                <Body className='bg-gray-100 font-sans py-10'>
                    {/* Subtle textured background container */}
                    <Container className='mx-auto py-10 px-5 max-w-150'>
                        <Section
                            className='bg-white mx-auto rounded-xl border border-gray-200 overflow-hidden'
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f8f8f8' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        >
                            {/* Header */}
                            <Section className='bg-black px-10 py-8 text-center'>
                                <Heading className='text-white text-[28px] font-bold m-0 tracking-tight'>
                                    UploadThingy
                                </Heading>
                            </Section>

                            {/* Main Content */}
                            <Section className='px-10 py-10'>
                                {/* Welcome Message */}
                                <Heading className='text-gray-900 text-[24px] font-bold mb-6 mt-0 leading-tight'>
                                    Welcome aboard, {name}!
                                </Heading>

                                <Text className='text-gray-700 text-[16px] leading-relaxed mb-6 mt-0'>
                                    Thank you for signing up for UploadThingy.
                                    We're excited to help you streamline your
                                    file upload workflow.
                                </Text>

                                {/* Product Description */}
                                <Text className='text-gray-600 text-[15px] leading-relaxed mb-8 mt-0 font-medium'>
                                    A simple, secure, and type-safe file
                                    uploader built for modern web apps.
                                </Text>

                                {/* Primary CTA */}
                                <Section className='text-center mb-8'>
                                    <Button
                                        className='bg-gray-900 text-white px-8 py-4 text-[16px] font-semibold rounded-[6px] border-none box-border inline-block text-center no-underline'
                                        href='#'
                                    >
                                        View Dashboard
                                    </Button>
                                </Section>
                            </Section>

                            {/* Footer */}
                            <Section className='bg-gray-50 px-10 py-6 border-t border-gray-200'>
                                <Text className='text-gray-500 text-[12px] text-center m-0 leading-relaxed'>
                                    © 2025 UploadThingy. All rights reserved.
                                </Text>
                                <Text className='text-gray-400 text-[12px] text-center m-0 mt-2 leading-relaxed'>
                                    Built for developers, by developers.
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeEmail;
