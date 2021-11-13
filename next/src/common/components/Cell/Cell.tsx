import React, { useState } from "react";

interface Cell {
  text: string;
  onChange: any;
  index: number;
}

class Cell extends React.Component {

  constructor(props) {
    super(props);
    this.text = props.text;
    this.onChange = props.onChange;
    this.index = props.index;
  }

  render() {

    let styles = {
      border: "1px solid black",
      width: "50px",
      height: "50px",
      display: "flex",
      justifyContent: "center",
    };

    return (
      <div style={styles}>
        <p
          suppressContentEditableWarning={true}
          contentEditable={this.text != "" ? "false" : "true"}
          style={{ width: "42px", margin: "auto", textAlign: "center" }}
          onInput={e => this.onChange(e.target["textContent"], this.index)}
        >
          {this.text}
        </p>
      </div>
    );
  }
}


export default Cell;
