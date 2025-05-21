import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { DEFAULT_GAME_STATE } from '../constants/game';
import gameConfig from '../config/gameConfig.json';

const Background = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
`;

const GameCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 40px;
  max-width: 1300px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media (max-width: 600px) {
    padding: 8px 2px;
    max-width: 100vw;
    border-radius: 0;
  }
`;

const StartScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
`;

const StartButton = styled.button`
  background: #1976d2;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 16px 40px;
  margin-top: 32px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.12);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #1256a3;
    transform: translateY(-2px) scale(1.04);
  }
`;

const Title = styled.h1`
  color: #222;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 12px;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const StatusBar = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ScoreDisplay = styled.div`
  font-size: 1.1rem;
  color: #4caf50;
  font-weight: 600;
  background: #e8f5e9;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 4px 10px;
  }
`;

const TimerDisplay = styled.div`
  font-size: 1.1rem;
  color: #1976d2;
  font-weight: 600;
  background: #e3f2fd;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 4px 10px;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 24px;
  margin: 18px 0 0 0;
  justify-content: center;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: crosshair;
  background: #f7fafc;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 4px;
  margin-bottom: 10px;
  align-self: center;
  @media (max-width: 600px) {
    padding: 2px;
    border-radius: 8px;
  }
`;

const fadeIn = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  opacity: 0;
  animation: fadeIn 0.7s ease forwards;
  animation-delay: 0.2s;
  @media (max-width: 900px) {
    max-width: 95vw;
  }
  @media (max-width: 600px) {
    max-width: 98vw;
    border-radius: 8px;
  }
  ${fadeIn}
`;

const popAnim = `
@keyframes popCircle {
  0% { transform: scale(0.3); opacity: 0.2; }
  60% { transform: scale(1.15); opacity: 1; }
  80% { transform: scale(0.95); }
  100% { transform: scale(1); opacity: 1; }
}
`;

const Overlay = styled.div`
  position: absolute;
  border: 3px solid #e53935;
  background-color: transparent;
  pointer-events: none;
  border-radius: 50%;
  transition: border 0.2s, background 0.2s;
  animation: popCircle 0.4s cubic-bezier(0.23, 1.12, 0.32, 1) both;
  ${popAnim}
`;

const congratsAnim = `
@keyframes congratsPop {
  0% { transform: scale(0.7) translate(-50%, -50%); opacity: 0; }
  60% { transform: scale(1.08) translate(-50%, -50%); opacity: 1; }
  80% { transform: scale(0.96) translate(-50%, -50%); }
  100% { transform: scale(1) translate(-50%, -50%); opacity: 1; }
}`;

const GameComplete = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 32px 20px;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  text-align: center;
  z-index: 1000;
  border: 2px solid #4caf50;
  animation: congratsPop 0.5s cubic-bezier(0.23, 1.12, 0.32, 1) both;
  @media (max-width: 600px) {
    padding: 18px 4px;
    border-radius: 8px;
  }
  ${congratsAnim}
`;

const CongratsTitle = styled.h2`
  color: #1976d2;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const CongratsText = styled.p`
  color: #333;
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const Game = () => {
  const [gameState, setGameState] = useState(DEFAULT_GAME_STATE);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameState.isGameComplete && gameState.startTime) {
      interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - gameState.startTime) / 1000));
      }, 1000);
    } else if (gameState.isGameComplete && gameState.endTime && gameState.startTime) {
      setTimer(Math.floor((gameState.endTime - gameState.startTime) / 1000));
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameState.isGameComplete, gameState.startTime, gameState.endTime]);

  useEffect(() => {
    if (gameStarted) {
      setGameState(prev => ({
        ...prev,
        startTime: Date.now(),
      }));
    }
  }, [gameStarted]);

  const checkDifference = useCallback((x, y, imageIndex) => {
    const imageElement = document.getElementById(`image${imageIndex}`);
    if (!imageElement) return;

    const rect = imageElement.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;
    const scaleX = imageElement.width / imageElement.naturalWidth;
    const scaleY = imageElement.height / imageElement.naturalHeight;

    // Map to original image pixel space
    const originalX = relativeX / scaleX;
    const originalY = relativeY / scaleY;

    gameConfig.differences.forEach((diff, index) => {
      if (gameState.foundDifferences.includes(index)) return;

      if (
        originalX >= diff.x - Math.max(diff.width, diff.height) / 2 &&
        originalX <= diff.x + Math.max(diff.width, diff.height) / 2 &&
        originalY >= diff.y - Math.max(diff.width, diff.height) / 2 &&
        originalY <= diff.y + Math.max(diff.width, diff.height) / 2
      ) {
        setGameState(prev => {
          const newFoundDifferences = [...prev.foundDifferences, index];
          const isComplete = newFoundDifferences.length === gameConfig.differences.length;
          return {
            ...prev,
            foundDifferences: newFoundDifferences,
            score: prev.score + 1,
            isGameComplete: isComplete,
            endTime: isComplete ? Date.now() : prev.endTime,
          };
        });
      }
    });
  }, [gameState.foundDifferences]);

  const handleImageClick = (e, imageIndex) => {
    if (!gameStarted || gameState.isGameComplete) return;
    checkDifference(e.clientX, e.clientY, imageIndex);
  };

  if (!gameStarted) {
    return (
      <Background>
        <GameCard>
          <StartScreen>
            <Title>{gameConfig.gameTitle}</Title>
            <StartButton onClick={() => setGameStarted(true)}>
              Start Game
            </StartButton>
          </StartScreen>
        </GameCard>
      </Background>
    );
  }

  return (
    <Background>
      <GameCard>
        <Title>{gameConfig.gameTitle}</Title>
        <StatusBar>
          <ScoreDisplay>
            Score: {gameState.score} / {gameConfig.differences.length}
          </ScoreDisplay>
          <TimerDisplay>
            Time: {timer} s
          </TimerDisplay>
        </StatusBar>
        <ImagesContainer>
          {[1, 2].map((imageIndex) => (
            <ImageWrapper
              key={imageIndex}
              onClick={(e) => handleImageClick(e, imageIndex)}
            >
              <Image
                id={`image${imageIndex}`}
                src={gameConfig.images[`image${imageIndex}`]}
                alt={`Image ${imageIndex}`}
              />
              {gameConfig.differences.map((diff, index) => {
                if (!gameState.foundDifferences.includes(index)) return null;
                const imageElement = document.getElementById(`image${imageIndex}`);
                let scaleX = 1, scaleY = 1;
                if (imageElement) {
                  scaleX = imageElement.width / imageElement.naturalWidth;
                  scaleY = imageElement.height / imageElement.naturalHeight;
                }
                const diameter = Math.max(diff.width, diff.height);
                const scaledDiameterX = diameter * scaleX;
                const scaledDiameterY = diameter * scaleY;
                return (
                  <Overlay
                    key={index}
                    found={true}
                    style={{
                      left: diff.x * scaleX - scaledDiameterX / 2,
                      top: diff.y * scaleY - scaledDiameterY / 2,
                      width: scaledDiameterX,
                      height: scaledDiameterY,
                    }}
                  />
                );
              })}
            </ImageWrapper>
          ))}
        </ImagesContainer>
        {gameState.isGameComplete && (
          <GameComplete>
            <CongratsTitle>Congratulations!</CongratsTitle>
            <CongratsText>You found all the differences.</CongratsText>
            <CongratsText>Time: {timer} seconds</CongratsText>
          </GameComplete>
        )}
      </GameCard>
    </Background>
  );
}; 