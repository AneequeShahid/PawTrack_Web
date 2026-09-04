'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [role, setRole] = useState('Admin');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    document.cookie = `session={"role":"${role}","username":"${username}"}; path=/`;
    router.push(`/dashboard/${role.toLowerCase()}`);
  };

  return (
    <div className="flex h-screen bg-[#0B0F14] text-white">
      <div className="hidden md:flex w-[55%] flex-col justify-center p-12 bg-[#111820] border-r border-[#263241]">
        <h1 className="text-4xl font-bold mb-4">🐾 PawTrack</h1>
        <p className="text-xl text-gray-400">Trap. Neuter. Vaccinate. Return. Tracked end-to-end.</p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-[#141C26] rounded-xl border border-[#263241]">
          <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
          <select className="w-full mb-4 p-2 bg-[#0B0F14] border border-[#263241] rounded text-white" value={role} onChange={e=>setRole(e.target.value)}>
            <option>Admin</option><option>Volunteer</option><option>Veterinarian</option><option>Adopter</option><option>Donor</option>
          </select>
          <input className="w-full mb-4 p-2 bg-[#0B0F14] border border-[#263241] rounded text-white" value={username} onChange={e=>setUsername(e.target.value)} />
          <button type="submit" className="w-full p-2 bg-[#5B8DEF] rounded font-semibold">Sign in as {role}</button>
        </form>
      </div>
    </div>
  );
}
