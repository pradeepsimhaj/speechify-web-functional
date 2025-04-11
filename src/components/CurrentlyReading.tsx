export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const currentSentence = sentences[currentSentenceIdx] || '';
  const [start, end] = currentWordRange;

  const before = currentSentence.slice(0, start);
  const word = currentSentence.slice(start, end);
  const after = currentSentence.slice(end);

  return (
    <div className="currently-reading" data-testid="currently-reading">
      <div className="currently-reading-text">
        <p data-testid="current-sentence">
          {before}
          <span className="currentword" data-testid="current-word">{word}</span>
          {after}
        </p>
      </div>
    </div>
  );
};

