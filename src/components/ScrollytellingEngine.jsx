import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const TOTAL_FRAMES = 96;
const FIRST_FRAME_INDEX = 101;

const ScrollytellingEngine = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameIndexRef = useRef(0);
  const loadedCountRef = useRef(0);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[frameIndexRef.current];
    if (!img?.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cw = canvas.width, ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw, dh = ch, ox = 0, oy = 0;
    if (cr > ir) { dh = cw / ir; oy = (ch - dh) / 2; }
    else         { dw = ch * ir; ox = (cw - dw) / 2; }
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  useImperativeHandle(ref, () => ({
    updateFrame: (index) => {
      frameIndexRef.current = Math.min(Math.max(index, 0), TOTAL_FRAMES - 1);
      renderFrame();
    }
  }));

  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame${FIRST_FRAME_INDEX + i}.jpg`;
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCountRef.current += 1;
        if (i === 0) renderFrame();
      };
      imagesRef.current[i] = img;
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      renderFrame();
    };
    window.addEventListener('resize', onResize, { passive: true });
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
});

export default ScrollytellingEngine;
