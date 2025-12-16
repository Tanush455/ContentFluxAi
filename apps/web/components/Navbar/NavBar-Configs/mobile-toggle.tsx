import { Menu, X } from 'lucide-react';

interface MobileToggleProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const MobileToggle = ({ isOpen, onToggle }: MobileToggleProps) => {
    return (
        <button
            className='md:hidden p-2 text-neutral-600 hover:text-primary transition-colors'
            onClick={onToggle}
            aria-label="Toggle menu"
        >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
    );
};