import React from "react";
import './Modal.css'

function Modal({ setOpenModal }, { test }) {
    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
                console.log(test);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1> here </h1>
          </div>
          <div className="body">
            <p>The next page looks amazing. Hope you want to go there!</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button>Continue</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;