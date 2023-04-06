import { useRef, useEffect } from 'react';

export default function Stat() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    
  }, []);

  return <canvas ref={canvasRef} />;
}