export const drawPath = (coordinates: [number, number][]): Promise<string> => {
    const CANVAS_SIZE = 480;
    const CANVAS_OFFSET = CANVAS_SIZE * 0.2;
    
    const lats = coordinates.map(([lat]) => lat);
    const lngs = coordinates.map(([, lng]) => lng);
    
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
  
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Canvas context not available');
  
    const scaleX = (canvas.width - CANVAS_OFFSET * 2) / (maxLng - minLng);
    const scaleY = (canvas.height - CANVAS_OFFSET * 1.5) / (maxLat - minLat);
  
    ctx.strokeStyle = '#FF7575';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  
    ctx.beginPath();
    coordinates.forEach(([lat, lng], i) => {
      const x = CANVAS_OFFSET + (lng - minLng) * scaleX;
      const y = canvas.height - CANVAS_OFFSET - (lat - minLat) * scaleY;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  
    return Promise.resolve(canvas.toDataURL());
  };