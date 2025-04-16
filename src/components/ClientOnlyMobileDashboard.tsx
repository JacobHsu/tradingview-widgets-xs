"use client";

import dynamic from 'next/dynamic';
import React from 'react';


const MobileDashboard = dynamic(
  () => import('@/components/MobileDashboard'), 
  {
    ssr: false, 
    loading: () => <p className="text-center text-gray-500">Loading Dashboard...</p>
  }
);

// 這個客戶端組件只負責渲染動態加載的 MobileDashboard
const ClientOnlyMobileDashboard: React.FC = () => {
  return <MobileDashboard />;
};

export default ClientOnlyMobileDashboard; 