import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import NavBar from './components/NavBar';
import HeroScene from './components/HeroScene';
import EateryExperienceScene from './components/EateryExperienceScene';
import CateringTransitionScene from './components/CateringTransitionScene';
import CommunityTrustScene from './components/CommunityTrustScene';
import TestimonialsScene from './components/TestimonialsScene';
import MenuGridScene from './components/MenuGridScene';
import EateryVibeScene from './components/EateryVibeScene';
import ConversionScene from './components/ConversionScene';
import FloatingUI from './components/FloatingUI';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useGSAP(() => {
    // Global ScrollTrigger setup or smoothing if needed
  });

  return (
    <main>
      <NavBar />
      <HeroScene />               {/* 01 Hero · 02 Filipino Classics · 03 Signatures */}
      <EateryExperienceScene />   {/* 04 How to Enjoy */}
      <CateringTransitionScene /> {/* 05 Catering Solution */}
      <CommunityTrustScene />     {/* 09 Community Trust */}
      <TestimonialsScene />        {/* 10 Google Reviews */}
      <MenuGridScene />            {/* 10 Menu */}
      <EateryVibeScene />          {/* 11 Our Story */}
      <ConversionScene />          {/* 16 CTA + Catering Form */}
      <FloatingUI />
    </main>
  );
}

export default App;
