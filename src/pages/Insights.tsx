import { ChevronLeft, History, Bell, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { api } from '../services/api';

const Insights = () => {
  const navigate = useNavigate();
  const { data: history, isLoading } = useSWR('/history', () => api.get('/history'));

  return (
    <div className="p-8 max-w-lg mx-auto bg-surface min-h-screen pb-24">
      <header className="flex items-center gap-4 mb-10 pt-4">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 rounded-full bg-surface-low flex items-center justify-center text-on-surface"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold font-display">Daily Insights</h1>
          <p className="text-on-surface-variant text-sm">System activity for today</p>
        </div>
      </header>

      <div className="space-y-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-surface-low rounded-2xl animate-pulse" />
          ))
        ) : history?.length > 0 ? (
          history.map((entry: any) => (
            <div 
              key={entry.id}
              className="bg-surface-low/50 rounded-2xl p-6 flex gap-5 border border-surface-high/20"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-high flex items-center justify-center text-primary shrink-0">
                {entry.type === 'SKU_UPDATE' && <Activity size={22} />}
                {entry.type === 'STOCK_MOVE' && <History size={22} />}
                {entry.type === 'SYSTEM' && <Bell size={22} />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold font-display text-on-surface leading-none">{entry.title}</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant whitespace-nowrap bg-surface-high px-2 py-1 rounded">
                    {entry.time}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center opacity-30">
            <History size={48} className="mx-auto mb-4" />
            <p className="font-medium italic">No recent activity detected</p>
          </div>
        )}
      </div>

      <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
        <p className="text-xs text-primary font-bold tracking-widest uppercase mb-1">Retention Policy</p>
        <p className="text-[10px] text-on-surface-variant opacity-60 italic leading-relaxed">
          Daily insights are automatically cleared at 00:00 every night to preserve storage and focusing on live operational data.
        </p>
      </div>
    </div>
  );
};

export default Insights;
