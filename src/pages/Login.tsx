
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { LayoutGrid, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
  const [step, setStep] = useState<'method' | 'phone' | 'email' | 'otp'>('method');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const { setUser } = useAuthStore();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authService.requestOtp(phone);
    setStep('otp');
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await authService.verifyOtp(phone, otp);
    setUser(user);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const users = await authService.login(email);
    if (users && users.length > 0) {
      setUser(users[0]);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col justify-center max-w-lg mx-auto bg-surface">
      <div className="mb-12">
        <label className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block font-display">
          Para Systems
        </label>
        <h1 className="text-4xl font-bold font-display text-on-surface leading-tight mb-4">
          Verdant Terminal
        </h1>
        <p className="text-on-surface-variant text-lg font-manrope">
          Secure Warehouse Access Control
        </p>
      </div>

      <div className="space-y-6">
        {step === 'method' && (
          <div className="space-y-4">
            <button
              onClick={() => setStep('phone')}
              className="w-full h-16 rounded-2xl bg-primary text-on-primary font-bold flex items-center justify-between px-6 transition-transform active:scale-95"
            >
              <span>Login with Phone</span>
              <ArrowRight size={24} />
            </button>
            <button
              onClick={() => setStep('email')}
              className="w-full h-16 rounded-2xl bg-surface-low text-on-surface font-bold flex items-center justify-between px-6 transition-transform active:scale-95"
            >
              <span>Email & Password</span>
              <ArrowRight size={24} />
            </button>
          </div>
        )}

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="text-on-surface-variant text-sm mb-2 block">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full h-14 bg-surface-highest rounded-xl px-4 text-on-surface industrial-input"
                required
              />
            </div>
            <button type="submit" className="w-full h-16 rounded-2xl bg-primary text-on-primary font-bold">
              Send OTP
            </button>
            <button onClick={() => setStep('method')} className="w-full text-on-surface-variant font-medium">
              Back
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="text-on-surface-variant text-sm mb-2 block">Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full h-14 bg-surface-highest rounded-xl px-4 text-on-surface industrial-input text-center text-2xl tracking-[1em]"
                maxLength={6}
                required
              />
            </div>
            <button type="submit" className="w-full h-16 rounded-2xl bg-primary text-on-primary font-bold">
              Verify & Enter
            </button>
            <p className="text-center text-on-surface-variant text-sm mt-4">
              Didn't receive code? <span className="text-primary font-bold">Resend</span>
            </p>
          </form>
        )}

        {step === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="space-y-4">
              <div>
                <label className="text-on-surface-variant text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@para.com"
                  className="w-full h-14 bg-surface-highest rounded-xl px-4 text-on-surface industrial-input"
                  required
                />
              </div>
              <div>
                <label className="text-on-surface-variant text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-14 bg-surface-highest rounded-xl px-4 text-on-surface industrial-input"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full h-16 rounded-2xl bg-primary text-on-primary font-bold">
              Authorize Access
            </button>
            <button onClick={() => setStep('method')} className="w-full text-on-surface-variant font-medium">
              Back
            </button>
          </form>
        )}
      </div>

      <div className="mt-auto pt-12 text-on-surface-variant text-[10px] space-y-2 uppercase tracking-widest font-bold">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-primary" />
          <span>Authorized Personnel Only</span>
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <LayoutGrid size={14} />
          <span>IP Logging Enabled • AES-256 Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
