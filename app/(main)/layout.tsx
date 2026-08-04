import BottomNav from "@/app/components/BottomNav";
import TopHeader from "@/app/components/TopHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col relative">
      <TopHeader />

      {/* Main content — scrollable area between header and nav */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: "calc(60px + env(safe-area-inset-bottom, 0px))" }}
      >
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
