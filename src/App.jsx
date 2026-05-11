import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroScene from './components/HeroScene';
import EateryVibeScene from './components/EateryVibeScene';
import MenuScene from './components/MenuScene';
import CommunityTrustScene from './components/CommunityTrustScene';
import ConversionScene from './components/ConversionScene';
import FloatingUI from './components/FloatingUI';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useGSAP(() => {
    // Global ScrollTrigger setup or smoothing if needed
  });

  return (
    <main>
      <HeroScene />
      <EateryVibeScene />
      <MenuScene />
      <CommunityTrustScene />
      <ConversionScene />
      <FloatingUI />
    </main>
  );
}

export default App;
