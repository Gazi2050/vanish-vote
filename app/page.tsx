import BannerText from "@/components/BannerText";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <main className="text-black bg-purple-50 h-screen">
      <Navbar />
      <BannerText />
      <Form />
    </main>
  );
}
