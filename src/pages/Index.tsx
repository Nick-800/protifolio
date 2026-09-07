import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MatrixRain from "@/components/MatrixRain";
import CommandPalette from "@/components/CommandPalette";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <CommandPalette />
      <MatrixRain />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
