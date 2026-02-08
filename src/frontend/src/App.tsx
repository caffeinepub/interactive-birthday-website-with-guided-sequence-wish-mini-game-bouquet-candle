import { useEffect } from 'react';
import { useBirthdayFlow } from './hooks/useBirthdayFlow';
import { BirthdayLayout } from './components/birthday/BirthdayLayout';
import { ProgressIndicator } from './components/birthday/ProgressIndicator';
import { StepWish } from './components/birthday/steps/StepWish';
import { StepMiniGame } from './components/birthday/steps/StepMiniGame';
import { StepBouquet } from './components/birthday/steps/StepBouquet';
import { StepCakeCandles } from './components/birthday/steps/StepCakeCandles';
import { StepGiftboxSmilies } from './components/birthday/steps/StepGiftboxSmilies';
import { StepBirthdayNote } from './components/birthday/steps/StepBirthdayNote';
import { SparkleTrailOverlay } from './components/birthday/SparkleTrailOverlay';
import { ToastLayer } from './components/birthday/notifications/ToastLayer';
import { Button } from './components/ui/button';
import { RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

function App() {
  const { 
    currentStep, 
    completeStep, 
    restart, 
    sfxMuted, 
    setSfxMuted, 
    setSfxArmed,
    sparkleTrailEnabled,
    setSparkleTrailEnabled
  } = useBirthdayFlow();

  useEffect(() => {
    const handleFirstInteraction = () => {
      setSfxArmed(true);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [setSfxArmed]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWish onComplete={() => completeStep(1)} />;
      case 2:
        return <StepMiniGame onComplete={() => completeStep(2)} />;
      case 3:
        return <StepBouquet onComplete={() => completeStep(3)} />;
      case 4:
        return <StepCakeCandles onComplete={() => completeStep(4)} />;
      case 5:
        return <StepGiftboxSmilies onComplete={() => completeStep(5)} />;
      case 6:
        return <StepBirthdayNote onRestart={restart} />;
      default:
        return <StepWish onComplete={() => completeStep(1)} />;
    }
  };

  return (
    <BirthdayLayout>
      <SparkleTrailOverlay />
      <ToastLayer />
      
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <ProgressIndicator currentStep={currentStep} totalSteps={6} />
      </div>
      
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => setSfxMuted(!sfxMuted)}
          variant="outline"
          size="icon"
          className="bg-white/90 hover:bg-white shadow-lg transition-all"
          title={sfxMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {sfxMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <Button
          onClick={() => setSparkleTrailEnabled(!sparkleTrailEnabled)}
          variant="outline"
          size="icon"
          className="bg-white/90 hover:bg-white shadow-lg transition-all"
          title={sparkleTrailEnabled ? "Disable Sparkle Trail" : "Enable Sparkle Trail"}
        >
          <Sparkles className={`h-4 w-4 ${sparkleTrailEnabled ? 'text-yellow-500' : 'text-gray-400'}`} />
        </Button>
        
        <Button
          onClick={restart}
          variant="outline"
          size="icon"
          className="bg-white/90 hover:bg-white shadow-lg hover:rotate-180 transition-all duration-500"
          title="Restart Experience"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        {renderStep()}
      </div>
    </BirthdayLayout>
  );
}

export default App;
