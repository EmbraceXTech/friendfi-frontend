import { Inter } from "next/font/google";
import ParticleProvider from "@/providers/particle.provider";
import AuthProvider from "@/providers/auth.provider";
import { usePathname } from "next/navigation";
import Bottombar from "./Bottombar";
const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <div
      className={`h-screen max-w-[500px] mx-auto relative ${inter.className}`}
    >
      <ParticleProvider>
        <AuthProvider>
          <div className="h-screen overflow-scroll">
            <div className="pb-8">
              {children}
            </div>
            <div className='h-9 w-full bg-white' />
            {path !== "/login" && path !== "/register" && <Bottombar />}
          </div>
        </AuthProvider>
      </ParticleProvider>
    </div>
  );
}
