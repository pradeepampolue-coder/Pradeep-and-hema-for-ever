
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProposalStep } from './types';
import { PROMISES, HeartIcon } from './constants';
import FloatingBackground from './components/FloatingBackground';
import Typewriter from './components/Typewriter';

declare const JSZip: any;
declare const saveAs: any;

const App: React.FC = () => {
  const [step, setStep] = useState<ProposalStep>(ProposalStep.START);
  const [promiseIndex, setPromiseIndex] = useState(-1);
  const [isSparkling, setIsSparkling] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const MUSIC_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3';

  const handleDownloadZip = async () => {
    try {
      const zip = new JSZip();

      // We gather the code from the environment if possible, or define them
      // For this implementation, we fetch the current files or use the known structure
      const filesToInclude = [
        'index.html',
        'index.tsx',
        'App.tsx',
        'types.ts',
        'constants.tsx',
        'metadata.json',
        'components/FloatingBackground.tsx',
        'components/Typewriter.tsx'
      ];

      for (const fileName of filesToInclude) {
        try {
          const response = await fetch(fileName);
          if (response.ok) {
            const content = await response.text();
            zip.file(fileName, content);
          }
        } catch (err) {
          console.error(`Could not fetch ${fileName}`, err);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'eternal-love-proposal.zip');
    } catch (error) {
      alert('Download failed. You can also manually copy the code from the editor.');
    }
  };

  const startJourney = () => {
    setStep(ProposalStep.OPENING);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const nextStep = useCallback(() => {
    setStep((prev) => {
      switch (prev) {
        case ProposalStep.OPENING: return ProposalStep.MAIN_MESSAGE;
        case ProposalStep.MAIN_MESSAGE: return ProposalStep.PROMISES;
        case ProposalStep.PROMISES: return ProposalStep.PROPOSAL;
        default: return prev;
      }
    });
  }, []);

  useEffect(() => {
    if (step === ProposalStep.PROMISES) {
      const interval = setInterval(() => {
        setPromiseIndex((prev) => {
          if (prev < PROMISES.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => nextStep(), 2500);
          return prev;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [step, nextStep]);

  const handleProposalResponse = () => {
    setIsSparkling(true);
    setStep(ProposalStep.ACCEPTED);
    if (audioRef.current) {
      let vol = 0.3;
      const interval = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.7) {
          vol = 0.7;
          clearInterval(interval);
        }
        if (audioRef.current) audioRef.current.volume = vol;
      }, 100);
    }
    setTimeout(() => {
      setStep(ProposalStep.FINALE);
    }, 5000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF9F9] via-[#FFD1DC] to-[#E6E6FA]">
      <audio ref={audioRef} loop src={MUSIC_URL} />
      
      <FloatingBackground />

      {/* Start Button Scene */}
      {step === ProposalStep.START && (
        <div className="z-10 flex flex-col items-center animate-fade-in text-center px-4">
          <HeartIcon className="w-20 h-20 text-[#9B1B30] animate-heartbeat mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif-elegant text-[#9B1B30] mb-8">A Journey of Hearts</h1>
          <button 
            onClick={startJourney}
            className="px-8 py-3 bg-[#9B1B30] text-white rounded-full text-lg font-medium shadow-lg hover:bg-[#7a1525] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mb-4"
          >
            Begin Our Story 💖
          </button>
          
          {/* Download Zip Button for Mobile User */}
          <button 
            onClick={handleDownloadZip}
            className="text-[#9B1B30]/60 text-sm font-medium underline underline-offset-4 hover:text-[#9B1B30] transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download Project Zip
          </button>
        </div>
      )}

      {/* Opening Scene */}
      {step === ProposalStep.OPENING && (
        <div className="z-10 text-center px-6">
          <Typewriter 
            text="Every heartbeat of mine has a story… and every story begins with you."
            className="text-2xl md:text-4xl font-handwritten text-[#9B1B30] leading-relaxed"
            onComplete={nextStep}
            speed={80}
          />
        </div>
      )}

      {/* Main Message Scene */}
      {step === ProposalStep.MAIN_MESSAGE && (
        <div className="z-10 max-w-2xl text-center px-6">
          <Typewriter 
            text="From the moment you came into my life, everything changed. My smiles became brighter, my days became warmer, and my heart finally found its home in you."
            className="text-xl md:text-3xl font-serif-elegant text-[#9B1B30] leading-loose italic"
            onComplete={nextStep}
            speed={60}
          />
        </div>
      )}

      {/* Promises Scene */}
      {step === ProposalStep.PROMISES && (
        <div className="z-10 flex flex-col items-center gap-6 px-6 text-center">
          <div className="relative">
            <HeartIcon className="w-16 h-16 text-[#9B1B30]/20 absolute -top-4 -left-4 animate-pulse" />
            <div className="space-y-6">
              {PROMISES.map((line, idx) => (
                <p 
                  key={idx}
                  className={`text-xl md:text-2xl font-serif-elegant transition-all duration-1000 transform ${
                    idx <= promiseIndex ? 'opacity-100 translate-y-0 text-[#9B1B30]' : 'opacity-0 translate-y-4 text-transparent'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Proposal Scene */}
      {step === ProposalStep.PROPOSAL && (
        <div className="z-10 flex flex-col items-center text-center px-4 animate-fade-in">
          <div className="absolute inset-0 bg-yellow-400/10 animate-pulse pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-serif-elegant font-bold text-[#D4AF37] mb-12 drop-shadow-md">
            Will you be mine — <br/>today, tomorrow, and forever?
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <button 
              onClick={handleProposalResponse}
              className="px-10 py-4 bg-white text-[#9B1B30] border-2 border-[#D4AF37] rounded-full text-xl font-serif-elegant shadow-xl hover:bg-[#FFF9F9] transition-all transform hover:scale-110 flex items-center gap-2"
            >
              💖 YES, always
            </button>
            <button 
              onClick={handleProposalResponse}
              className="px-10 py-4 bg-[#FFD1DC] text-[#9B1B30] rounded-full text-xl font-serif-elegant shadow-xl hover:bg-[#ffc0cb] transition-all transform hover:scale-110 flex items-center gap-2"
            >
              🌸 I already am yours
            </button>
          </div>
        </div>
      )}

      {/* Accepted Scene */}
      {step === ProposalStep.ACCEPTED && (
        <div className="z-20 flex flex-col items-center justify-center animate-fade-in text-center">
          <div className="relative">
            <HeartIcon className="w-48 h-48 text-[#9B1B30] animate-heartbeat shadow-red-500/50" />
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 animate-pulse" />
          </div>
          <h2 className="mt-12 text-5xl md:text-7xl font-handwritten text-[#9B1B30] drop-shadow-sm">You've made me the happiest!</h2>
        </div>
      )}

      {/* Finale Scene */}
      {step === ProposalStep.FINALE && (
        <div className="z-10 flex flex-col items-center text-center px-6 max-w-2xl animate-fade-in">
          <p className="text-2xl md:text-4xl font-serif-elegant text-[#9B1B30] leading-relaxed italic mb-8">
            “No matter where life takes us, my hand will always be here, holding yours.”
          </p>
          <div className="mt-12 opacity-80 flex flex-col items-center gap-4">
             <HeartIcon className="w-12 h-12 text-[#9B1B30] animate-heartbeat" />
             <p className="text-3xl font-handwritten text-[#9B1B30]">Forever and Always Yours.</p>
          </div>
        </div>
      )}

      {/* Sparkles Overlay */}
      {isSparkling && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
             <div 
               key={i} 
               className="sparkle bg-white animate-ping"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 width: `${Math.random() * 4 + 2}px`,
                 height: `${Math.random() * 4 + 2}px`,
                 animationDelay: `${Math.random() * 2}s`,
                 animationDuration: `${Math.random() * 3 + 1}s`
               }}
             />
          ))}
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,245,245,0.2)_100%)]" />
    </div>
  );
};

export default App;
