import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex-col flex justify-end items-center p-3 px-5 text-sm">
          <AuthButton />
        </div>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Welcome
      </main>
    </div>
  );
}
