import React from "react";
import "./index.css";
const TextUnderScore = (props) => {
  const { placeholder, ref } = props;
  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }
  setTimeout(() => {
    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  }, 500);

  return (
    <>
      {" "}
      <div className="container-group">
        {" "}
        <div className="form-list one">
          <div className="div">
            <input
              type="text"
              placeholder={placeholder}
              ref={ref}
              className="input"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextUnderScore;
