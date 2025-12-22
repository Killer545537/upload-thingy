import { Search } from 'lucide-react';
import { Kbd, KbdGroup } from '../ui/kbd';

interface HeaderProps {
    onSearchClick: () => void;
}

const Header = ({ onSearchClick }: HeaderProps) => (
    <header className='h-14 bg-background border-b border-border flex items-center justify-between px-6'>
        <button
            className='flex items-center gap-3 px-3 py-2 bg-gray-50 border border-border rounded-lg text-sm text-muted-foreground hover:bg-gray-100 transition-colors w-64'
            onClick={onSearchClick}
            type='button'
        >
            <Search className='w-4 h-4' />
            <span>Search files...</span>
            <KbdGroup className='ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-background border border-border rounded'>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
            </KbdGroup>
        </button>
    </header>
);

export default Header;
