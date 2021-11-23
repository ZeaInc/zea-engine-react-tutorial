import React from "react";
import { Viewport3D } from "./Viewport3D";
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { 
      // example: props.example
    }
  }

  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <label>Side bar</label>
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement className="right-pane" flex={0.85}>
          <Viewport3D/>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

export { Main }