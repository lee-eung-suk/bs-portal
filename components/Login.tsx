import React, { useState } from 'react';
import { ShieldCheck, School, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demonstration purposes
    // In a real app, this would validate against a backend
    if (password === '1234' || password === '봉성초' || password === 'bongseong') {
      onLogin();
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/5 transition-all">
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 shadow-lg">
            <School className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">봉성초등학교</h1>
          <p className="mt-2 text-blue-100 font-medium">교직원 업무 포털</p>
        </div>
        
        <div className="p-8">
          <div className="mb-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800 flex items-start">
            <ShieldCheck className="mr-2 h-5 w-5 flex-shrink-0 text-amber-600" />
            <p>본 사이트는 교직원 전용 업무 공간입니다. 인가된 사용자만 접근할 수 있습니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                접속 비밀번호
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                  placeholder="비밀번호를 입력하세요 (힌트: 1234)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                />
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              로그인
            </button>
          </form>
          
          <div className="mt-8 text-center text-xs text-gray-400">
             © 2024 Bongseong Elementary School. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};