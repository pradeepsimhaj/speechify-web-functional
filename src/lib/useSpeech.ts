import { useEffect, useRef, useState } from "react";
import { createSpeechEngine, PlayingState } from "./speech";

const useSpeech = (sentences: string[]) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const engineRef = useRef(
    createSpeechEngine({
      onBoundary: (e) => {
        if (e.name === "word") {
          setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
        }
      },
      onEnd: () => {
        if (currentSentenceIdx < sentences.length - 1) {
          const nextIdx = currentSentenceIdx + 1;
          setCurrentSentenceIdx(nextIdx);
          engineRef.current.load(sentences[nextIdx]);
          engineRef.current.play();
        } else {
          setPlaybackState("ended");
        }
      },
      onStateUpdate: (state) => setPlaybackState(state),
    })
  );

  useEffect(() => {
    if (sentences.length > 0) {
      engineRef.current.load(sentences[currentSentenceIdx]);
    }
  }, [sentences]);

  const play = () => {
    engineRef.current.play();
  };

  const pause = () => {
    engineRef.current.pause();
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };

