import React, { useRef } from 'react'
// @ts-ignore
import DeniReactTreeView from 'deni-react-treeview'
import { Renderer } from './Renderer'
import 'react-reflex/styles.css'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      treeNodes: [],
      selected: null,
    }
  }

  onSelectItemHandler = (item: any) => {
    this.setState({ selected: item.geomItem })
  }

  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <DeniReactTreeView
            style={{ width: 'auto', height: '99%' }}
            theme={'classic'}
            items={this.state.treeNodes}
            onSelectItem={this.onSelectItemHandler}
          />
        </ReflexElement>

        <ReflexSplitter propagate={true} />
        <ReflexElement className="right-pane" flex={0.85}>
          <Renderer
            selected={this.state.selected}
            setSelected={(selected: number) => {
              this.setState({ selected: selected })
            }}
            setTree={(nodes: any) => {
              this.setState({ treeNodes: nodes })
            }}
          ></Renderer>
        </ReflexElement>
      </ReflexContainer>
    )
  }
}

export { Main }
