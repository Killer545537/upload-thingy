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

const PasswordResetEmail = ({
    name,
    resetUrl,
}: {
    name: string;
    resetUrl: string;
}) => {
    return (
        <Html dir='ltr' lang='en'>
            <Tailwind>
                <Head />
                <Preview>Reset your UploadThingy password</Preview>
                <Body className='bg-gray-100 font-sans py-10'>
                    {/* Subtle linear grain background container */}
                    <Container className='mx-auto py-10 px-5 max-w-150'>
                        <Section
                            className='bg-white mx-auto rounded-xl border border-gray-200 overflow-hidden'
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grain' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fafafa;stop-opacity:1' /%3E%3Cstop offset='25%25' style='stop-color:%23f9f9f9;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23fafafa;stop-opacity:1' /%3E%3Cstop offset='75%25' style='stop-color:%23f8f8f8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23fafafa;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grain)' /%3E%3C/svg%3E")`,
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
                                {/* Main Headline */}
                                <Heading className='text-gray-900 text-[24px] font-bold mb-6 mt-0 leading-tight'>
                                    Reset your password, {name}
                                </Heading>

                                {/* Explanatory Text */}
                                <Text className='text-gray-700 text-[16px] leading-relaxed mb-8 mt-0'>
                                    We received a request to reset the password
                                    for your UploadThingy account. Click the
                                    button below to create a new password.
                                </Text>

                                {/* Primary CTA */}
                                <Section className='text-center mb-8'>
                                    <Button
                                        className='bg-gray-900 text-white px-8 py-4 text-[16px] font-semibold rounded-[6px] border-none box-border inline-block text-center no-underline'
                                        href={resetUrl}
                                    >
                                        Reset Password
                                    </Button>
                                </Section>

                                {/* Security Note */}
                                <Section className='bg-gray-50 px-6 py-5 rounded-[6px] border border-gray-200 mb-8'>
                                    <Text className='text-gray-600 text-[14px] leading-relaxed m-0'>
                                        If you didn't request this password
                                        reset, you can safely ignore this email.
                                        Your password will remain unchanged.
                                    </Text>
                                </Section>

                                {/* Additional Info */}
                                <Text className='text-gray-500 text-[14px] leading-relaxed mb-4 mt-0'>
                                    This password reset link will expire in 24
                                    hours for your security.
                                </Text>
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

export default PasswordResetEmail;
