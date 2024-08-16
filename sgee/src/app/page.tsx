import Sidebar from './components/Sidebar';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700&display=swap" />

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow bg-white p-6 ml-1/5">
        {children}
      </main>
    </div>
  );
}
