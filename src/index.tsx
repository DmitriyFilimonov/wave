import ReactDOM from "react-dom";
import React from "react";
import styled from 'styled-components';



const Draggable = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid red;
`

const Slot = styled.div`
  width: 200px;
  height: 120px;
  border: 1px solid red;
`

let clientX: number = 0;
let clientY: number = 0;

const App = () => {
  return (
    <>
      <Draggable
        draggable="true"
        onDrag={(e) => {
          if (e.clientX !== clientX || e.clientY !== clientY) {
            clientX = e.clientX;
            clientY = e.clientY;

            console.log('dragging')
          }
        }
        }
      />
      <Slot
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={() => console.log('enter')}
        onDragLeave={() => console.log('leave')}
        onDrop={() => console.log('drop')}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("wave-app"));