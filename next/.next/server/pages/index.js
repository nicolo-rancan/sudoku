"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

;// CONCATENATED MODULE: external "react/jsx-runtime"
const jsx_runtime_namespaceObject = require("react/jsx-runtime");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./src/common/components/Cell/Cell.tsx


class Cell extends (external_react_default()).Component {
    constructor(props){
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
            justifyContent: "center"
        };
        return(/*#__PURE__*/ jsx_runtime_namespaceObject.jsx("div", {
            style: styles,
            children: /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("p", {
                suppressContentEditableWarning: true,
                contentEditable: this.text != "" ? "false" : "true",
                style: {
                    width: "42px",
                    margin: "auto",
                    textAlign: "center"
                },
                onInput: (e)=>this.onChange(e.target["textContent"], this.index)
                ,
                children: this.text
            })
        }));
    }
}
/* harmony default export */ const Cell_Cell = (Cell);

;// CONCATENATED MODULE: ./src/pages/index.tsx




const getStaticProps = async ()=>{
    const res = await fetch(`https://sugoku2.herokuapp.com/board?difficulty=hard`);
    const data = await res.json();
    if (!data) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            data
        }
    };
};
class ARP extends (external_react_default()).Component {
    constructor(props){
        super(props);
        this.state = {
            solution: ""
        };
        this.elements = [];
        this.values = [];
        this.handleChange = this.cellChanged.bind(this);
        this.handleClick = this.checkCells.bind(this);
        this.resultColor = "red";
        for(let i = 0; i < props.data.board.length; i++)for(let k = 0; k < props.data.board[i].length; k++)this.values.push(props.data.board[i][k]);
        /*let test = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3, 4,
      5, 6, 2, 1, 4, 3, 6, 5, 8, 9, 7, 3, 6, 5, 8, 9, 7, 2, 1, 4, 8, 9, 7, 2, 1,
      4, 3, 6, 5, 5, 3, 1, 6, 4, 2, 9, 7, 8, 6, 4, 2, 9, 7, 8, 5, 3, 1, 9, 7, 8,
      5, 3, 1, 6, 4, 2,
    ];

    this.values = test;*/ for(let i1 = 0; i1 < 81; i1++){
            let cellProps = {
                key: i1,
                text: this.values[i1] == 0 ? "" : this.values[i1],
                //text: test[i],
                onChange: this.handleChange,
                index: i1
            };
            this.elements.push(/*#__PURE__*/ jsx_runtime_namespaceObject.jsx(Cell_Cell, {
                ...cellProps
            }));
        }
    }
    checkCells() {
        // 0: Array non completato - 1: Array completato - 2: Soluzione corretta
        let flag = 1;
        for(let i = 0; i < this.values.length && flag != 0; i++)if (this.values[i] == 0) flag = 0;
        let repeated = flag == 0 ? true : false;
        let board = [];
        let rows = [];
        let columns = [];
        let boxes = [];
        // Conversione dell'array in matrice
        for(let i2 = 0; i2 < 9; i2++){
            let row = [];
            for(let k = (i2 + 1) * 9 - 9; k < (i2 + 1) * 9; k++){
                row.push(this.values[k]);
            }
            board.push(row);
        }
        for(let i3 = 0; i3 < 9; i3++){
            rows.push([]);
            columns.push([]);
            boxes.push([]);
        }
        // Controllo validità matrice
        for(let i4 = 0; i4 < board.length && !repeated; i4++){
            for(let j = 0; j < board.length && !repeated; j++){
                let cell = board[i4][j];
                if (rows[i4].includes(cell)) {
                    repeated = true;
                } else rows[i4].push(cell);
                if (columns[j].includes(cell)) {
                    repeated = true;
                } else columns[j].push(cell);
                let boxIndex = Math.floor(i4 / 3) * 3 + Math.floor(j / 3);
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
            solution: textResult
        });
    }
    cellChanged(value, index) {
        this.values[index] = value;
    }
    render() {
        return(/*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("div", {
            children: [
                /*#__PURE__*/ jsx_runtime_namespaceObject.jsx((head_default()), {
                    children: /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("title", {
                        children: "Sudoku"
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("div", {
                    style: {
                        boxSizing: "border-box"
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("img", {
                            style: {
                                width: "50%",
                                margin: "20px"
                            },
                            src: "sudoku.svg",
                            alt: "sudoku logo"
                        }),
                        /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("div", {
                            id: "parent",
                            style: {
                                width: "468px",
                                display: "flex",
                                flexWrap: "wrap",
                                margin: "0 20px",
                                fontSize: "20px",
                                fontFamily: "sans-serif"
                            },
                            children: this.elements.map((el)=>el
                            )
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("div", {
                            style: {
                                paddingTop: "50px"
                            },
                            children: [
                                /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("button", {
                                    style: {
                                        padding: "5px 15px",
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        margin: "0 20px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontFamily: "sans-serif"
                                    },
                                    onClick: this.handleClick,
                                    children: "Check"
                                }),
                                /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("p", {
                                    style: {
                                        color: this.resultColor,
                                        fontWeight: "bold",
                                        display: "inline",
                                        marginLeft: "20px"
                                    },
                                    children: this.state.solution
                                })
                            ]
                        })
                    ]
                })
            ]
        }));
    }
}
/* harmony default export */ const pages = (ARP);


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(460));
module.exports = __webpack_exports__;

})();