import { useRef, useEffect } from "react";

const CanvasWrapper = (props: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export { CanvasWrapper };
