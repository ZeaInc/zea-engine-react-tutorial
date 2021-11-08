import React from 'react'
import { Canvas } from '../hooks/Canvas'

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

class Renderer extends React.Component<any, any> {
  scene: Scene = new Scene()
  renderer?: GLRenderer | any
  id_treeItem: Record<number, TreeItem> = {}
  constructor(props: any) {
    super(props)
    this.state = {
      setSelected: props.setSelected,
      setTree: props.setTree,
    }
  }

  componentDidMount() {
    console.log('Renderer mount')
    this.renderer = new GLRenderer(document.getElementById('canvas')) //React.createRef();//
    this.renderer.setScene(this.scene)

    this.scene.setupGrid(10, 10)
    this.initialize()

    this.renderer.getViewport().on('pointerDown', (event: any) => {
      const geomItem = event?.intersectionData?.geomItem
      const id = geomItem?.__id
      if (id !== undefined) {
        this.state.setSelected(id) // callback to force re render...
      } else {
        this.state.setSelected(null)
      }
    })

    const nodes = this.traverse_tree() // note: lazy load. Renderer w/ 1000s nodes will take a while. if expanded, render the children. 3loc
    this.state.setTree(nodes)
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.selected !== this.props.selected) {
      this.highlight(this.props.selected)
    }
  }

  highlight(geomItem: GeomItem) {
    if (geomItem == null) return

    if(geomItem)
    geomItem.addHighlight('hl', new Color(1.0, 1.0, 0.2, 0.5), false)
  }

  initialize() {
    const camera = this.renderer.getViewport().getCamera()
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))
    const material = new Material('surfaces', 'SimpleSurfaceShader')

    material.getParameter('BaseColor')?.setValue(new Color(0.5, 0.5, 0.5))

    const sphere = new Sphere(1.0, 20, 20)
    const geomItem0 = new GeomItem(
      'sphere0',
      sphere,
      material,
      new Xfo(new Vec3(0, 0, 0))
    )
    this.scene.getRoot().addChild(geomItem0)

    const geomItem1 = new GeomItem(
      'sphere01',
      sphere,
      material,
      new Xfo(new Vec3(0, 5, 0))
    )
    this.scene.getRoot().addChild(geomItem1)
    const geomItem2 = new GeomItem(
      'sphere2',
      sphere,
      material,
      new Xfo(new Vec3(0, -5, 0))
    )
    geomItem1.addChild(geomItem2)
    const geomItem3 = new GeomItem(
      'sphere3',
      sphere,
      material,
      new Xfo(new Vec3(5, 0, 0))
    )
    geomItem2.addChild(geomItem3)
    const geomItem4 = new GeomItem(
      'sphere4',
      sphere,
      material,
      new Xfo(new Vec3(-5, 0, 0))
    )
    geomItem2.addChild(geomItem4)
  }

  /*
    traverse tree and create node tree
  */
  traverse_tree() {
    let nodes: ITreeNode[] = this.traverse_tree_helper(this.scene.getRoot())
    const root: ITreeNode = {
      text: 'Scene',
      id: 1,
      isLeaf: false,
      children: nodes,
      geomItem: null,
    }
    return [root]
  }

  traverse_tree_helper(treeItem: TreeItem): ITreeNode[] {
    if (!treeItem) return []

    var items = []
    for (var child of treeItem.getChildren()) {
      if (child instanceof GeomItem) {
        this.id_treeItem[child.getId()] = child // custom map for fast highlight given an id
        // construct child node
        const childNode: ITreeNode = {
          text: child.getName(),
          id: child.getId(),
          isLeaf: true,
          children: [],
          geomItem: child,
        }
        // get child nodes of this childnode
        childNode.children = this.traverse_tree_helper(child)
        // store items to return to caller
        items.push(childNode)
      }
    }
    return items
  }

  render() {
    return (
      <Canvas
        ref={this.renderer}
        className="screen"
        id="canvas"
        width="500px"
        height="500px"
      />
    )
  }
}
export { Renderer }
