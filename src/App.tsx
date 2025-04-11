import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useState } from 'react';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    loadNewSentences,
  } = useSpeech(sentences);

  const handleLoad = async () => {
    const content = await fetchContent();
    const parsed = parseContentIntoSentences(content);
    setSentences(parsed);
    loadNewSentences(parsed);
  };

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          currentSentenceIdx={currentSentenceIdx}
          currentWordRange={currentWordRange}
          sentences={sentences}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={handleLoad}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
