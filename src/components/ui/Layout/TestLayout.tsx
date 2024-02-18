import { Inter } from "next/font/google";
import ParticleProvider from "@/providers/particle.provider";
import AuthProvider from "@/providers/auth.provider";
const inter = Inter({ subsets: ["latin"] });

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`h-screen max-w-[500px] mx-auto relative ${inter.className}`}
    >
      <ParticleProvider>
        <AuthProvider>{children}</AuthProvider>
      </ParticleProvider>
    </div>
  );
}
