export const drawPath = (
  coordinates: { lat: number; lng: number }[]
): Promise<string> => {
  const CANVAS_SIZE = 480;
  const CANVAS_OFFSET = CANVAS_SIZE * 0.2;
  const POINT_RADIUS = 15;

  const lats = coordinates.map((coord) => coord.lat);
  const lngs = coordinates.map((coord) => coord.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Canvas context not available");

  const scaleX = (canvas.width - CANVAS_OFFSET * 2) / (maxLng - minLng || 0.0001); // 0으로 나누기 방지
  const scaleY = (canvas.height - CANVAS_OFFSET * 1.5) / (maxLat - minLat || 0.0001);

  ctx.strokeStyle = "#167258";
  ctx.fillStyle = "#167258"; 
  ctx.lineWidth = 15;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (coordinates.length === 1) {
    // 좌표가 하나일 때는 원을 그림
    const coord = coordinates[0];
    const x = CANVAS_OFFSET + (coord.lng - minLng) * scaleX;
    const y = canvas.height - CANVAS_OFFSET - (coord.lat - minLat) * scaleY;
    
    ctx.beginPath();
    ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // 좌표가 여러 개일 때는 선을 그림
    ctx.beginPath();
    coordinates.forEach((coord, i) => {
      const x = CANVAS_OFFSET + (coord.lng - minLng) * scaleX;
      const y = canvas.height - CANVAS_OFFSET - (coord.lat - minLat) * scaleY;

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