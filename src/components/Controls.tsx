import { PlayingState } from '../lib/speech';

export const Controls = ({
  play,
  pause,
  loadNewContent,
  state,
}: {
  play: () => void;
  pause: () => void;
  loadNewContent: () => void;
  state: PlayingState;
}) => {
  return (
    <div>
      {state === "playing" ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={play}>Play</button>
      )}
      <button onClick={loadNewContent}>Load new content</button>
    </div>
  );
};
