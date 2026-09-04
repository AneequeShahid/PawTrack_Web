'use client';
import { Activity, DollarSign, Users } from 'lucide-react';

export default function DonorDashboard() {
  return (
    <div className="animate-in zoom-in-95 duration-500 ease-out text-white space-y-8">
      <h1 className="text-3xl font-bold">Your Impact Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141C26] p-8 rounded-xl border border-[#263241] text-center hover:scale-105 transition-transform duration-300">
          <DollarSign className="w-12 h-12 text-[#4ADE80] mx-auto mb-4" />
          <p className="text-gray-400">Total Contribution</p>
          <h2 className="text-4xl font-bold mt-2">$1,250</h2>
        </div>
        <div className="bg-[#141C26] p-8 rounded-xl border border-[#263241] text-center hover:scale-105 transition-transform duration-300 delay-100">
          <Activity className="w-12 h-12 text-[#5B8DEF] mx-auto mb-4" />
          <p className="text-gray-400">Animals Helped</p>
          <h2 className="text-4xl font-bold mt-2">14</h2>
        </div>
        <div className="bg-[#141C26] p-8 rounded-xl border border-[#263241] text-center hover:scale-105 transition-transform duration-300 delay-200">
          <Users className="w-12 h-12 text-[#F5A623] mx-auto mb-4" />
          <p className="text-gray-400">Colonies Supported</p>
          <h2 className="text-4xl font-bold mt-2">2</h2>
        </div>
      </div>
    </div>
  );
}
