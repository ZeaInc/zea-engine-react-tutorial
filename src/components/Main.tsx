import React from "react";
import { Viewport3D } from "./Viewport3D";
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
// @ts-ignore
import DeniReactTreeView from 'deni-react-treeview'
class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { 
      treeNodes: [],

    }
  }

  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <DeniReactTreeView
            style={{ width: 'auto', height: '99%' }}
            theme={'classic'}
            items={this.state.treeNodes}
          />
        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement className="right-pane" flex={0.85}>
        <Viewport3D
            setTree={(nodes: any) => {
              this.setState({ treeNodes: nodes })
            }}
          ></Viewport3D>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

export { Main }