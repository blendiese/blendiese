import AuthProtected from "@/components/auth-protected";
import { LogoutButton } from "@/components/logout-button";
import { MenuItems } from "@/components/menu-items";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="h-full w-32 flex flex-col justify-between border-r border-r-foreground/10 py-8 px-4 fixed left-0 top-0 bg-white">
          <MenuItems />
          <div className="w-full max-w-5xl flex flex-col gap-5 items-center p-3 px-5 text-sm">
            <LogoutButton />
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 p-5 pl-36 pr-24 w-full">
          <AuthProtected>{children}</AuthProtected>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Blendiese
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
