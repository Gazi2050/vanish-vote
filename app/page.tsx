import BannerText from "@/components/BannerText";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <main className="text-black bg-purple-50 h-full">
      <Navbar />
      <BannerText />
      <Form />
      <Feature />
      <Footer />
    </main>
  );
}
