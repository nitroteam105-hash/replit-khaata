import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  // Prevent scrolling on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-[101] max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>
            <div className="px-4 py-3 flex items-center justify-between border-b">
              <h2 className="font-display font-semibold text-lg">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto pb-safe">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}