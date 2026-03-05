import { createFileRoute } from '@tanstack/react-router';
import { Button } from '#/components/ui/button';

export const Route = createFileRoute('/')({ component: App });

function App() {
    return (
        <div className='min-w-screen min-h-screen justify-center items-center flex'>
            <Button>Click me!</Button>
        </div>
    );
}
