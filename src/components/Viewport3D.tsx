import React from 'react'

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
} from '@zeainc/zea-engine'

interface ITreeNode {
  text: string
  id: number
  isLeaf: boolean
  children: ITreeNode[]
  geomItem: GeomItem | null
}

class Viewport3D extends React.Component<any, any> {
  scene: Scene = new Scene()
  renderer?: GLRenderer
  canvasRef: React.RefObject<any>
  constructor(props: any) {
    super(props)
    this.state = {
      setSelected: props.setSelected,
      setTree: props.setTree,
    }
    this.canvasRef = React.createRef()
  }
  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current)
    this.renderer.setScene(this.scene)
    this.scene.setupGrid(10, 10)

    const camera = this.renderer.getViewport().getCamera()
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))

    this.setupScene()

    const nodes = this.traverse_tree()
    this.state.setTree(nodes)
    
    this.renderer.getViewport().on('pointerDown', (event: any) => {
      const geomItem = event?.intersectionData?.geomItem
      if (geomItem instanceof GeomItem) {
        this.state.setSelected(geomItem)
      } else {
        this.state.setSelected(null)
      }
    })
  }
  // this method is called the 'props' of the component are changed.
  componentDidUpdate(prevProps: any) {
    if (prevProps.selected !== this.props.selected) {
      this.unhighlight(prevProps.selected)
      this.toggle_highlight(this.props.selected)
    } else {
      this.toggle_highlight(this.props.selected)
    }
  }

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

  traverse_tree() {
    const scene_root = this.scene.getRoot()
    let nodes: ITreeNode[] = this.traverse_tree_helper(scene_root)
    const root: ITreeNode = {
      text: 'Scene',
      id: scene_root.getId(),
      isLeaf: false,
      children: nodes,
      geomItem: null,
    }
    return [root]
  }

  traverse_tree_helper(treeItem: TreeItem): ITreeNode[] {
    if (!treeItem) return [];

    const items = [];
    for (let child of treeItem.getChildren()) {
      if (child instanceof GeomItem) {
        // construct child node
        const childNode: ITreeNode = {
          text: child.getName(),
          id: child.getId(),
          isLeaf: true,
          children: [],
          geomItem: child,
        };
        // get child nodes of this childnode
        childNode.children = this.traverse_tree_helper(child);
        // store items to return to caller
        items.push(childNode);
      }
    }
    return items;
  }

  toggle_highlight(treeItem: GeomItem) {
    if (treeItem == null) return
    if (!(treeItem instanceof GeomItem)) return

    if (!treeItem.isHighlighted()) {
      treeItem.addHighlight('hl', new Color(1.0, 1.0, 0.2, 0.5), false)
    } else {
      treeItem.removeHighlight('hl', false)
    }
  }

  unhighlight(treeItem: GeomItem) {
    if (treeItem == null) return
    if (!(treeItem instanceof GeomItem)) return

    if (treeItem.isHighlighted()) {
      treeItem.removeHighlight('hl', false)
    }
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
    )
  }
}

export { Viewport3D }
