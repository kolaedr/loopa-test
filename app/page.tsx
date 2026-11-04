export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <div className="bg-blue-500 text-white p-4 text-center">
        <p className="font-semibold">Welcome to Work</p>
      </div>
      
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Loopa</h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Next.js app scaffold. Replace this page to start building.
          </p>
        </div>
      </main>
    </div>
  );
}
