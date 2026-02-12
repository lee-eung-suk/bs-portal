import React, { useState, useEffect } from 'react';
import { Sun, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import { LinkCard } from './LinkCard';
import { SchoolFrame } from './SchoolFrame';
import { LinkItem } from '../types';

export const Dashboard: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
      };
      setCurrentDate(now.toLocaleDateString('ko-KR', options));
    };
    
    updateDate();
    const timer = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const DASHBOARD_LINKS: LinkItem[] = [
    {
      id: '1',
      title: '구글 드라이브',
      description: '업무 파일 보관 및 공유',
      url: 'https://drive.google.com/drive/u/0/folders/1hR-UTznGbS1esLzxofInpHrg3Unym98b',
      iconType: 'drive',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-100 hover:ring-blue-200',
    },
    {
      id: '2',
      title: '업무 공유 시트',
      description: '전체 일정 및 업무 현황',
      url: 'https://docs.google.com/spreadsheets/d/1SsvYs2q9HlT3WbiNOwLF1mb2rhyedqlajKKfARCNCTI/edit?gid=0#gid=0',
      iconType: 'sheet',
      color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 ring-1 ring-emerald-100 hover:ring-emerald-200',
    },
    {
      id: '3',
      title: '봉성초 유튜브',
      description: '학교 행사 영상 모음',
      url: 'https://www.youtube.com/@%EB%B4%89%EC%84%B1%EC%B4%88%EB%93%B1%ED%95%99%EA%B5%90',
      iconType: 'youtube',
      color: 'bg-red-50 hover:bg-red-100 text-red-700 ring-1 ring-red-100 hover:ring-red-200',
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md transform transition hover:scale-105">
              <GraduationCap size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-800 leading-tight">봉성초등학교</h1>
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">교직원 업무 포털</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              <Calendar size={12} />
              <span>{currentDate}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          
          {/* Welcome Card */}
          <div className="mb-8 overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  선생님, 환영합니다! <span className="inline-block animate-pulse">👋</span>
                </h2>
                <p className="mt-2 text-gray-500">
                   봉성초등학교 스마트 업무 공간입니다. 오늘도 아이들과 함께 행복한 하루 되세요.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-10">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
              <BookOpen size={20} className="text-indigo-600" />
              자주 찾는 업무
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {DASHBOARD_LINKS.map((link) => (
                <LinkCard key={link.id} item={link} />
              ))}
            </div>
          </div>

          {/* Homepage Preview */}
          <div className="mb-8">
             <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800">
              <Sun size={20} className="text-amber-500" />
              학교 홈페이지
            </h3>
            <div className="rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
               <SchoolFrame url="https://school.gyo6.net/bwbongseong/main.do?sysId=bwbongseong" />
            </div>
          </div>

        </div>
      </main>

      <footer className="mt-auto border-t border-gray-200 bg-white py-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-600">봉성초등학교 교직원 업무 포털</p>
          <p className="mt-1 text-xs text-gray-400">경상북도 봉화군 봉성면 봉성로 524</p>
          <p className="mt-2 text-[10px] text-gray-300">본 사이트는 교직원 업무 편의를 위해 제작되었습니다.</p>
        </div>
      </footer>
    </div>
  );
};