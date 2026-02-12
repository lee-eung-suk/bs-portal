import React, { useState, useEffect } from 'react';
import { Calendar, Monitor, Link2, BookOpenCheck } from 'lucide-react';
import { LinkCard } from './LinkCard';
import { SchoolFrame } from './SchoolFrame';
import { LinkItem } from '../types';

export const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
      };
      setCurrentDate(now.toLocaleDateString('ko-KR', options));
    };
    
    updateDate();
    const timer = setInterval(updateDate, 60000); 
    return () => clearInterval(timer);
  }, []);

  const DASHBOARD_LINKS: LinkItem[] = [
    {
      id: '1',
      title: '업무 드라이브',
      description: '파일 공유 및 보관함',
      url: 'https://drive.google.com/drive/u/0/folders/1hR-UTznGbS1esLzxofInpHrg3Unym98b',
      iconType: 'drive',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: '2',
      title: '업무 공유 시트',
      description: '실시간 일정/업무 협업',
      url: 'https://docs.google.com/spreadsheets/d/1SsvYs2q9HlT3WbiNOwLF1mb2rhyedqlajKKfARCNCTI/edit?gid=0#gid=0',
      iconType: 'sheet',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      id: '3',
      title: '봉성초 유튜브',
      description: '학교 행사 영상 아카이브',
      url: 'https://www.youtube.com/@%EB%B4%89%EC%84%B1%EC%B4%88%EB%93%B1%ED%95%99%EA%B5%90',
      iconType: 'youtube',
      color: 'from-red-500 to-red-600',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
      
      {/* Abstract Background Shapes */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-100/50 to-transparent -z-10" />
      <div className="fixed -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="fixed top-40 -left-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10" />

      {/* Main Content Container */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                교직원 전용
              </span>
              <span className="text-sm text-slate-500 font-medium flex items-center gap-1">
                <Calendar size={14} />
                {currentDate}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
              Bongseong <span className="text-indigo-600">Portal</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">봉성초등학교 스마트 업무 공간</p>
          </div>
        </header>

        {/* Quick Links Grid */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="text-indigo-500" size={20} />
            <h2 className="text-xl font-bold text-slate-800">바로가기</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DASHBOARD_LINKS.map((link) => (
              <LinkCard key={link.id} item={link} />
            ))}
          </div>
        </section>

        {/* Website Preview Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="text-slate-500" size={20} />
            <h2 className="text-xl font-bold text-slate-800">학교 홈페이지</h2>
          </div>
          
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <SchoolFrame url="https://school.gyo6.net/bwbongseong/main.do?sysId=bwbongseong" />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center pb-8 border-t border-slate-200 pt-8">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <BookOpenCheck size={16} />
          </div>
          <p className="text-sm text-slate-500 font-medium">봉성초등학교 교직원 업무 포털</p>
          <p className="text-xs text-slate-400 mt-1">Copyright © Bongseong Elementary School</p>
        </footer>
      </div>
    </div>
  );
};