import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const ScrollytellingEngine = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameIndexRef = useRef(0);
  
  // Total frames: 96
  const totalFrames = 96;

  useImperativeHandle(ref, () => ({
    updateFrame: (index) => {
      frameIndexRef.current = index;
      renderFrame();
    }
  }));

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Calculate image index (101 to 196)
      const index = i + 101;
      img.src = `/web scroll frames webp/Jeffs_websequence_v${index}.webp`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          // Initial render once all are loaded
          requestAnimationFrame(renderFrame);
        }
      };
      
      // Fallback for errors to prevent hanging
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  const renderFrame = () => {
    if (images.length < totalFrames || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ensure index is within bounds
    const safeIndex = Math.min(Math.max(Math.floor(frameIndexRef.current), 0), totalFrames - 1);
    const img = images[safeIndex];
    
    if (img && img.width > 0) {
      // Draw to cover
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;
      
      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame();
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener('resize', handleResize);
  }, [images]); // Re-bind when images are ready to ensure renderFrame has access to them

  return (
    <canvas 
      ref={canvasRef}
      className="scrollytelling-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Should be behind other elements but same level as video was
        pointerEvents: 'none',
      }}
    />
  );
});

export default ScrollytellingEngine;
