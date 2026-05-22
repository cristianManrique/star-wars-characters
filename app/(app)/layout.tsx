import Footer from "@/app/components/layout/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {children}
      <Footer />
    </div>
  );
}
