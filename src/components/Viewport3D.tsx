import React from "react";

import {
  Scene,
  GLRenderer,
  Vec3,
  Material,
  Sphere,
  GeomItem,
  Color,
  Xfo,
  TreeItem,
} from "@zeainc/zea-engine";

class Viewport3D extends React.Component<any, any> {
  scene: Scene = new Scene();
  renderer?: GLRenderer;
  canvasRef: React.RefObject<any>
  constructor(props: any) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef()
  }
  

  // this method is called when the component is initially mounted and initially renders.
  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current);
    this.renderer.setScene(this.scene);

    // The parameters for setupGrid are gridSize, the size of the grid
    // and the resolution, or the number of divisions in the grid.
    this.scene.setupGrid(10, 10);

    const camera = this.renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5));

    this.setupScene()
    }
  

  // this method is called the 'props' of the component are changed.
  componentDidUpdate(prevProps: any) {}
  setupScene() {
    const material = new Material('surfaces', 'SimpleSurfaceShader')
    material.getParameter('BaseColor')?.setValue(new Color(0.5, 0.5, 0.5))
    const sphere = new Sphere(1.0, 20, 20)

    const createSphere = (name: string, position: Vec3) => {
      const geomItem = new GeomItem(name, sphere, material, new Xfo(position))
      return geomItem
    }
    
    const geomItem0 = createSphere('sphere0', new Vec3(0, 0, 0))
    const geomItem1 = createSphere('sphere1', new Vec3(0, 5, 0))
    const geomItem2 = createSphere('sphere2', new Vec3(0, -5, 0))
    const geomItem3 = createSphere('sphere3', new Vec3(5, 0, 0))
    const geomItem4 = createSphere('sphere5', new Vec3(-5, 0, 0))

    // Add geometry to the SceneTree and also create a hierarchy of geometry by parenting geometry.
    this.scene.getRoot().addChild(geomItem0)
    this.scene.getRoot().addChild(geomItem1)
    geomItem1.addChild(geomItem2)
    geomItem2.addChild(geomItem3)
    geomItem2.addChild(geomItem4)
  }
  // The Viewport3D component needs a reference to the canvas in order to initialize.
  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className="screen"
        id="canvas"
        width="500px"
        height="500px"
      />
    );
  }
}

export { Viewport3D };