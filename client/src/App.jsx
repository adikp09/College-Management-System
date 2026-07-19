import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Features from "./components/home/Features";
import About from "./components/home/About";
import Departments from "./components/home/Departments";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Departments />
    </>
  );
}

export default App;