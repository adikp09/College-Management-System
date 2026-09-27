import Hero from "../../components/home/Hero";
import Stats from "../../components/home/Stats";
import Features from "../../components/home/Features";
import About from "../../components/home/About";
import Departments from "../../components/home/Departments";
import Faculty from "../../components/home/Faculty";
import Gallery from "../../components/home/Gallery";
import Testimonials from "../../components/home/Testimonials";
import Placement from "../../components/home/Placement";
import News from "../../components/home/News";
import Admission from "../../components/home/Admission";
import CTA from "../../components/home/CTA";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Departments />
      <Faculty />
      <Gallery />
      <Testimonials />
      <Placement />
      <News />
      <Admission />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;