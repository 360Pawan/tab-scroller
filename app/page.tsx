import { ScrollableTabs } from "../components/ScrollableTabs";

export default function Home() {
  const tabs = [
    { name: "tab1", isActive: true },
    { name: "tab2", isActive: false },
    { name: "tab3", isActive: false },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center">
      <ScrollableTabs />
    </main>
  );
}
