import React, { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw, Trophy, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ArcadeGame = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(120);
  const [gameState, setGameState] = useState('start'); // start, playing, gameover

  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let player = { x: canvas.width / 2 - 15, y: canvas.height - 40, w: 30, h: 20, speed: 6 };
    let bullets = [];
    let bugs = [];
    let localScore = 0;

    const keys = {};

    const handleKeyDown = (e) => {
      keys[e.key] = true;
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playLaser();
        bullets.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 10 });
      }
    };

    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Spawn bugs periodically
    let spawnTimer = 0;

    const gameLoop = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Player Movement
      if (keys['ArrowLeft'] || keys['a']) {
        player.x = Math.max(0, player.x - player.speed);
      }
      if (keys['ArrowRight'] || keys['d']) {
        player.x = Math.min(canvas.width - player.w, player.x + player.speed);
      }

      // Draw Player Ship
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(player.x + 10, player.y - 6, 10, 6);

      // Spawn Bug Enemies
      spawnTimer++;
      if (spawnTimer % 45 === 0) {
        bugs.push({
          x: Math.random() * (canvas.width - 25),
          y: -20,
          w: 25,
          h: 20,
          speed: 1.8 + Math.random() * 1.5,
          label: ['BUG', 'ERR', '404', 'NULL'][Math.floor(Math.random() * 4)]
        });
      }

      // Update & Draw Bullets
      for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i];
        b.y -= 7;
        ctx.fillStyle = '#ec4899';
        ctx.fillRect(b.x, b.y, b.w, b.h);

        if (b.y < 0) {
          bullets.splice(i, 1);
          i--;
        }
      }

      // Update & Draw Bugs
      for (let i = 0; i < bugs.length; i++) {
        const bug = bugs[i];
        bug.y += bug.speed;

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(bug.x, bug.y, bug.w, bug.h);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(bug.label, bug.x + 3, bug.y + 13);

        // Bullet Collision check
        for (let j = 0; j < bullets.length; j++) {
          const b = bullets[j];
          if (
            b.x < bug.x + bug.w &&
            b.x + b.w > bug.x &&
            b.y < bug.y + bug.h &&
            b.y + b.h > bug.y
          ) {
            bugs.splice(i, 1);
            bullets.splice(j, 1);
            i--;
            localScore += 10;
            setScore(localScore);
            soundFx.playHover();
            break;
          }
        }

        // Game Over condition
        if (bug.y + bug.h >= canvas.height - 10) {
          setGameState('gameover');
          if (localScore > highScore) setHighScore(localScore);
          return;
        }
      }

      animId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, gameState]);

  if (!isOpen) return null;

  return (
    <div className="arcade-backdrop" onClick={onClose}>
      <div className="arcade-modal" onClick={(e) => e.stopPropagation()}>
        <div className="arcade-header">
          <div className="arcade-title">
            <Zap size={20} className="arcade-icon" />
            <span>Developer Bug Blaster 3D Arcade</span>
          </div>
          <button className="arcade-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="arcade-stats-bar">
          <div className="stat">Score: <strong>{score}</strong></div>
          <div className="stat high">
            <Trophy size={14} />
            <span>High: <strong>{highScore}</strong></span>
          </div>
        </div>

        <div className="arcade-canvas-wrap">
          {gameState === 'start' && (
            <div className="arcade-screen-overlay">
              <h3>Blast the Code Bugs! 👾</h3>
              <p>Use <strong>← → (Left / Right)</strong> to move, <strong>Spacebar</strong> to shoot.</p>
              <button
                className="arcade-btn"
                onClick={() => { setScore(0); setGameState('playing'); soundFx.playWarp(); }}
              >
                <Play size={18} /> Start Game
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="arcade-screen-overlay">
              <h3 className="gameover-text">Game Over! 💥</h3>
              <p>Final Score: {score}</p>
              <button
                className="arcade-btn"
                onClick={() => { setScore(0); setGameState('playing'); soundFx.playWarp(); }}
              >
                <RotateCcw size={18} /> Play Again
              </button>
            </div>
          )}

          <canvas ref={canvasRef} width={420} height={320} className="arcade-canvas" />
        </div>
      </div>
    </div>
  );
};
