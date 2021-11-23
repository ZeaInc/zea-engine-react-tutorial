import React from "react";
import { Viewport3D } from "./Viewport3D";

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { 
      // example: props.example
    }
  }

  render() {
    return (
      <Viewport3D></Viewport3D>
    )
  }
}

export { Main }