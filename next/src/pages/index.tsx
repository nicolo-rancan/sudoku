import React, { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";

import Cell from "../common/components/Cell/Cell";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://sugoku2.herokuapp.com/board?difficulty=hard`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

interface ARP {
  elements: Array<any>;
  values: Array<number>;
  handleChange: any;
  handleClick: any;
  state: any;
  resultColor: string;
}

class ARP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      solution: "",
    };

    this.elements = [];
    this.values = [];
    this.handleChange = this.cellChanged.bind(this);
    this.handleClick = this.checkCells.bind(this);
    this.resultColor = "red";

    for (let i = 0; i < props.data.board.length; i++)
      for (let k = 0; k < props.data.board[i].length; k++)
        this.values.push(props.data.board[i][k]);

    /*let test = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3, 4,
      5, 6, 2, 1, 4, 3, 6, 5, 8, 9, 7, 3, 6, 5, 8, 9, 7, 2, 1, 4, 8, 9, 7, 2, 1,
      4, 3, 6, 5, 5, 3, 1, 6, 4, 2, 9, 7, 8, 6, 4, 2, 9, 7, 8, 5, 3, 1, 9, 7, 8,
      5, 3, 1, 6, 4, 2,
    ];

    this.values = test;*/

    for (let i = 0; i < 81; i++) {
      let cellProps = {
        key: i,
        text: this.values[i] == 0 ? "" : this.values[i],
        //text: test[i],
        onChange: this.handleChange,
        index: i,
      };

      this.elements.push(<Cell {...cellProps} />);
    }
  }

  checkCells() {
    // 0: Array non completato - 1: Array completato - 2: Soluzione corretta
    let flag = 1;

    for (let i = 0; i < this.values.length && flag != 0; i++)
      if (this.values[i] == 0) flag = 0;

    let repeated = false;

    let board = [];
    let rows = [];
    let columns = [];
    let boxes = [];

    // Conversione dell'array in matrice
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let k = (i + 1) * 9 - 9; k < (i + 1) * 9; k++) {
        row.push(this.values[k]);
      }
      board.push(row);
    }

    for (let i = 0; i < 9; i++) {
      rows.push([]);
      columns.push([]);
      boxes.push([]);
    }

    // Controllo validità matrice
    for (let i = 0; i < board.length && !repeated; i++) {
      for (let j = 0; j < board.length && !repeated; j++) {
        let cell = board[i][j];

        if (rows[i].includes(cell)) {
          repeated = true;
        } else rows[i].push(cell);

        if (columns[j].includes(cell)) {
          repeated = true;
        } else columns[j].push(cell);

        let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        if (boxes[boxIndex].includes(cell)) {
          repeated = true;
        } else boxes[boxIndex].push(cell);
      }
    }

    if (!repeated) flag = 2;

    let textResult = "";

    if (flag == 0) {
      textResult = "Board not completed!";
      this.resultColor = "orange";
    } else if (flag == 1) {
      textResult = "Board incorrect!";
      this.resultColor = "red";
    } else {
      textResult = "Board correct!";
      this.resultColor = "green";
    }

    this.setState({
      solution: textResult,
    });
  }

  cellChanged(value, index) {
    this.values[index] = value;
    this.checkCells();
  }

  render() {
    return (
      <div>
        <Head>
          <title>Sudoku</title>
        </Head>
        <div style={{ boxSizing: "border-box" }}>
          <img
            style={{ width: "50%", margin: "20px" }}
            src="sudoku.svg"
            alt="sudoku logo"
          />
          <div
            id="parent"
            style={{
              width: "468px",
              display: "flex",
              flexWrap: "wrap",
              margin: "0 20px",
              fontSize: "20px",
              fontFamily: "sans-serif",
            }}
          >
            <img
              src="mask.png"
              style={{
                position: "absolute",
                width: "450px",
                height: "450px",
                marginTop: "-4px",
                marginLeft: "-4px",
                zIndex: -1,
              }}
            />
            {this.elements.map((el) => el)}
          </div>
          <div style={{ paddingTop: "50px" }}>
            <button
              style={{
                padding: "5px 15px",
                border: "1px solid black",
                borderRadius: "5px",
                margin: "0 20px",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
              onClick={this.handleClick}
            >
              Check
            </button>
            <p
              style={{
                color: this.resultColor,
                fontWeight: "bold",
                display: "inline",
                marginLeft: "20px",
              }}
            >
              {this.state.solution}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ARP;
