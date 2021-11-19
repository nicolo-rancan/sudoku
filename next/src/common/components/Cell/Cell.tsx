import React, { useState } from "react";

interface Cell {
  text: string;
  onChange: any;
  index: number;
  state: any;
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.text = props.text;
    this.onChange = props.onChange;
    this.index = props.index;

    this.state = {
      textC: this.text,
    };
  }

  textChanged(e, i) {
    if (
      (e.target["textContent"] < 10 && e.target["textContent"] >= 1) ||
      e.target["textContent"] == ""
    ) {
      this.setState({ textC: e.target["textContent"] });
      this.onChange(e.target["textContent"], this.index);
    } else {
      e.target["textContent"] = this.state.textC;
    }
  }

  render() {
    let styles = {
      width: "49px",
      height: "49px",
      display: "flex",
      justifyContent: "center",
      color: this.text != "" ? "#7a7a7a" : "black",
      fontWeight: this.text != "" ? "bold" : "normal",
      paddingLeft: this.index / 3 == 1 && this.index % 9 != 0 ? "3px" : "0px",
    };

    return (
      <div style={styles}>
        <p
          suppressContentEditableWarning={true}
          contentEditable={this.text != "" ? "false" : "true"}
          style={{ width: "42px", margin: "auto", textAlign: "center" }}
          onInput={(e) => this.textChanged(e, this.index)}
        >
          {this.state.textC}
        </p>
      </div>
    );
  }
}

export default Cell;
