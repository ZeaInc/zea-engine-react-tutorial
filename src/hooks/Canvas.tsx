import { useRef, useEffect } from "react";

const Canvas = (props: any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);
  // console.log("return canvas: ", canvasRef);

  return <canvas ref={canvasRef} {...props} />;
};

export { Canvas };
