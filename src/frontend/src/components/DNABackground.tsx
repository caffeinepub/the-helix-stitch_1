import { useEffect, useRef } from "react";

export default function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Rich warm brown tones for DNA strands — highly visible
    const strand1Color = "rgba(139, 90, 43, 0.55)";
    const strand2Color = "rgba(101, 60, 25, 0.45)";
    const rungColor = "rgba(160, 110, 60, 0.40)";
    const nodeColor = "rgba(180, 120, 55, 0.60)";

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colCount = Math.max(2, Math.floor(canvas.width / 220));
      const colSpacing = canvas.width / colCount;

      for (let col = 0; col < colCount; col++) {
        const cx = colSpacing * col + colSpacing / 2;
        const amplitude = 55;
        const waveLen = 120;
        const speed = 0.4;
        const offset = col % 2 === 0 ? 0 : Math.PI;

        const rungStep = waveLen / 8;
        for (let y = -waveLen; y < canvas.height + waveLen; y += rungStep) {
          const phase = (y / waveLen) * Math.PI * 2 + t * speed + offset;
          const x1 = cx + Math.sin(phase) * amplitude;
          const x2 = cx + Math.sin(phase + Math.PI) * amplitude;

          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = rungColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.beginPath();
        let firstPoint = true;
        for (let y = -10; y <= canvas.height + 10; y += 3) {
          const phase = (y / waveLen) * Math.PI * 2 + t * speed + offset;
          const x = cx + Math.sin(phase) * amplitude;
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = strand1Color;
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.beginPath();
        firstPoint = true;
        for (let y = -10; y <= canvas.height + 10; y += 3) {
          const phase =
            (y / waveLen) * Math.PI * 2 + t * speed + offset + Math.PI;
          const x = cx + Math.sin(phase) * amplitude;
          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = strand2Color;
        ctx.lineWidth = 3.5;
        ctx.stroke();

        for (let y = -waveLen; y < canvas.height + waveLen; y += rungStep) {
          const phase = (y / waveLen) * Math.PI * 2 + t * speed + offset;
          const x1 = cx + Math.sin(phase) * amplitude;
          const x2 = cx + Math.sin(phase + Math.PI) * amplitude;

          ctx.beginPath();
          ctx.arc(x1, y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      t += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
