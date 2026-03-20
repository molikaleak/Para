
import { Camera, X, Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScanModal = ({ isOpen, onClose }: ScanModalProps) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'success'>('idle');
  const { setQuery } = useSearchStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSimulateOCR = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('analyzing');
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
          setQuery('Schneider Circuit Breaker');
          onClose();
          navigate('/search');
          setStatus('idle');
        }, 1500);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />
      
      <div className="w-full max-w-sm bg-surface-low rounded-[2.5rem] p-8 relative z-20 overflow-hidden border border-surface-high shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-surface-high">
          {(status === 'uploading' || status === 'analyzing') && (
            <div className="h-full bg-primary animate-progress origin-left" />
          )}
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-surface-high rounded-full"
        >
          <X size={20} />
        </button>

        <div className="text-center py-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 relative">
            {status === 'idle' && <Camera size={40} className="text-primary" />}
            {(status === 'uploading' || status === 'analyzing') && <Loader2 size={40} className="text-primary animate-spin" />}
            {status === 'success' && <CheckCircle2 size={40} className="text-primary animate-in zoom-in duration-300" />}
          </div>

          <h2 className="text-2xl font-bold font-display mb-3">
            {status === 'idle' && 'Smart Asset Scan'}
            {status === 'uploading' && 'Uploading Image...'}
            {status === 'analyzing' && 'Analyzing Specs...'}
            {status === 'success' && 'Asset Identified!'}
          </h2>
          
          <p className="text-on-surface-variant font-manrope mb-10 leading-relaxed px-4">
            {status === 'idle' && 'Upload or take a photo of an asset SKU or nameplate to search automatically.'}
            {status === 'uploading' && 'Syncing high-resolution asset image to secure terminal servers.'}
            {status === 'analyzing' && 'Applying neural character recognition to extract technical keywords.'}
            {status === 'success' && 'Redirecting to results for: Schneider Circuit Breaker'}
          </p>

          {status === 'idle' && (
            <div className="space-y-4">
              <button 
                onClick={handleSimulateOCR}
                className="w-full h-16 rounded-2xl bg-primary text-on-primary font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <Camera size={24} />
                Open Terminal Camera
              </button>
              <button 
                onClick={handleSimulateOCR}
                className="w-full h-16 rounded-2xl bg-surface-high text-on-surface font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <Upload size={24} />
                Upload from Gallery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanModal;
