import Header from '@/components/main/header';
import Sidebar from '@/components/main/sidebar';

const Page = () => (
    <div className='min-h-screen flex bg-background'>
        <Sidebar />

        <div className='flex-1 ml-60'>
            <Header />
        </div>
    </div>
);

export default Page;
