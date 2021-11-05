import React, { useRef } from "react";
// @ts-ignore
import DeniReactTreeView from "deni-react-treeview";

import { Renderer } from "./Renderer";
import "react-reflex/styles.css";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { AddItemAndSubitemApi } from "../hooks/AddItem";

const MyContext = React.createContext({ selected: 0 });

class Main extends React.Component<any, any> {
  treeviewRef = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      treeNodes: [],
      selected: null,
    };

    this.setState({ selected: 100 });
  }

  onSelectItemHandler = (item: any) => {
    this.setState({ selected: item.id });
  };

  render() {
    return (
      <ReflexContainer orientation="vertical">
        <ReflexElement className="left-pane">
          <div className="pane-content">
            <DeniReactTreeView
              ref={this.treeviewRef}
              style={{ marginRight: "10px", marginBottom: "10px" }}
              key={0}
              showCheckbox={true}
              theme={"classic"}
              items={this.state.treeNodes}
              onSelectItem={this.onSelectItemHandler}
            />
          </div>
        </ReflexElement>

        <ReflexSplitter />
        <ReflexElement className="right-pane" minSize={800} maxSize={1600}>
          <div className="pane-content">
            <MyContext.Provider value={this.state.selected}>
              <Renderer
                selected={this.state.selected}
                setSelected={(selected: number) => {
                  this.setState({ selected: selected });
                }}
                setTree={(nodes: any) => {
                  this.setState({ treeNodes: nodes });
                }}
              ></Renderer>
            </MyContext.Provider>
          </div>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

export { Main };
