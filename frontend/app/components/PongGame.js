import React, { useRef, useEffect, useState } from 'react';
import './PongGame.css';

const PongGame = () => {
  const canvasRef = useRef(null);
  const [ball, setBall] = useState({ x: 50, y: 50, dx: 2, dy: 2 });
  const [paddle, setPaddle] = useState({ x: 0, y: 200 });
  const paddleHeight = 100;
  const paddleWidth = 10;
  const ballRadius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawBall = () => {
      context.beginPath();
      context.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
      context.fillStyle = '#0095DD';
      context.fill();
      context.closePath();
    };

    const drawPaddle = () => {
      context.beginPath();
      context.rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
      context.fillStyle = '#0095DD';
      context.fill();
      context.closePath();
    };

    const moveBall = () => {
      let newX = ball.x + ball.dx;
      let newY = ball.y + ball.dy;

      if (newX + ballRadius > canvas.width || newX - ballRadius < 0) {
        setBall((prevBall) => ({ ...prevBall, dx: -prevBall.dx }));
      }

      if (newY + ballRadius > canvas.height || newY - ballRadius < 0) {
        setBall((prevBall) => ({ ...prevBall, dy: -prevBall.dy }));
      }

      setBall((prevBall) => ({ ...prevBall, x: newX, y: newY }));
    };

    const update = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      moveBall();
      requestAnimationFrame(update);
    };

    update();
  }, [ball, paddle]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    setPaddle({ x: 0, y: e.clientY - canvas.offsetTop - paddleHeight / 2 });
  };

  return (
    <canvas
      ref={canvasRef}
      width="800"
      height="400"
      onMouseMove={handleMouseMove}
      style={{ border: '1px solid #000' }}
    />
  );
};

export default PongGame;
