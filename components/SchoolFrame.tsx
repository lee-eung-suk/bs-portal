import React, { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface SchoolFrameProps {
  url: string;
}

export const SchoolFrame: React.FC<SchoolFrameProps> = ({ url }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Note: Many school sites block iframes via X-Frame-Options.
  // This component handles that gracefully by showing a link button if it fails or if the user prefers.
  
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Fallback / Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-white/90 px-4 py-2 backdrop-blur-sm text-sm border-b border-gray-100">
        <span className="font-medium text-gray-500">봉성초등학교 홈페이지</span>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <ExternalLink size={14} />
          <span>새 창으로 열기</span>
        </a>
      </div>

      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-0">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-500">홈페이지 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* Error State (simulated if iframe load fails visually, though hard to detect cross-origin) */}
      {hasError ? (
        <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-4">
            <ExternalLink className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">연결이 차단되었습니다</h3>
          <p className="mb-6 max-w-md text-sm text-gray-500">
            학교 홈페이지 보안 정책으로 인해 미리보기를 표시할 수 없습니다. 
            아래 버튼을 눌러 직접 접속해주세요.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            홈페이지 바로가기
          </a>
        </div>
      ) : (
        <iframe
          src={url}
          className="h-full w-full pt-10"
          title="봉성초등학교 홈페이지"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}
      
      {/* If the site sends X-Frame-Options: DENY, the iframe will be empty. 
          We provide a manual "Help" overlay at the bottom if it looks broken to the user. 
      */}
      <div className="absolute bottom-4 right-4 z-20">
         <button 
           onClick={() => setHasError(true)}
           className="rounded-full bg-white/80 p-2 text-xs text-gray-500 shadow-sm backdrop-blur hover:bg-white flex items-center gap-1"
           title="화면이 안 보이면 클릭하세요"
         >
           <RefreshCw size={12} />
           <span>화면이 안 보이나요?</span>
         </button>
      </div>
    </div>
  );
};