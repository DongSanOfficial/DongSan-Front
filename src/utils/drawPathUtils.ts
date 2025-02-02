export const drawPath = (
  coordinates: { lat: number; lng: number }[]
): Promise<string> => {
  const CANVAS_SIZE = 480;
  const CANVAS_OFFSET = CANVAS_SIZE * 0.2;
  const POINT_RADIUS = CANVAS_SIZE * 0.03;
 
  const lats = coordinates.map((coord) => coord.lat);
  const lngs = coordinates.map((coord) => coord.lng);
 
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
 
  // 위도/경도 차이가 매우 작은 경우 (한 자리에 머무른 경우) 체크
  const isStationary = (maxLat - minLat < 0.00001) && (maxLng - minLng < 0.00001);
 
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext("2d");
 
  if (!ctx) throw new Error("Canvas context not available");
 
  ctx.strokeStyle = "#167258";
  ctx.fillStyle = "#167258";
  ctx.lineWidth = CANVAS_SIZE * 0.03;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
 
  if (isStationary) {
    const centerX = CANVAS_SIZE / 2;
    const centerY = CANVAS_SIZE / 2;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, POINT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    return Promise.resolve(canvas.toDataURL());
  }
 
  const latDiff = Math.max(maxLat - minLat, 0.00001); 
  const lngDiff = Math.max(maxLng - minLng, 0.00001); 
 
  // 위도와 경도의 비율을 유지하기 위한 계산
  let width = CANVAS_SIZE;
  let height = CANVAS_SIZE;
  
  if (latDiff > lngDiff) {
    width = Math.max(CANVAS_SIZE * (lngDiff / latDiff), CANVAS_SIZE * 0.3);
  } else {
    height = Math.max(CANVAS_SIZE * (latDiff / lngDiff), CANVAS_SIZE * 0.3); 
  }
 
  // 캔버스 중앙에 그리기 위한 오프셋 계산
  const xOffset = (CANVAS_SIZE - width) / 2 + CANVAS_OFFSET;
  const yOffset = (CANVAS_SIZE - height) / 2 + CANVAS_OFFSET;
 
  const scaleX = (width - CANVAS_OFFSET * 2) / (maxLng - minLng || 0.00001);
  const scaleY = (height - CANVAS_OFFSET * 2) / (maxLat - minLat || 0.00001);
 
  if (coordinates.length === 1) {
    const coord = coordinates[0];
    const x = xOffset + (coord.lng - minLng) * scaleX;
    const y = canvas.height - yOffset - (coord.lat - minLat) * scaleY;
    
    ctx.beginPath();
    ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    coordinates.forEach((coord, i) => {
      const x = xOffset + (coord.lng - minLng) * scaleX;
      const y = canvas.height - yOffset - (coord.lat - minLat) * scaleY;
 
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }
 
  return Promise.resolve(canvas.toDataURL());
 };