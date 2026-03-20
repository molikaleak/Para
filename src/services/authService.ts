import { api } from './api';

export const authService = {
  requestOtp: (phone: string) => {
    console.log(`Mock: Requesting OTP for ${phone}`);
    return Promise.resolve({ success: true });
  },
  verifyOtp: (phone: string, otp: string) => {
    console.log(`Mock: Verifying OTP ${otp} for ${phone}`);
    // Simulate finding user 1
    return api.get('/users/1');
  },
  login: (email: string) => {
    return api.get(`/users?email=${email}`);
  }
};
