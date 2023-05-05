import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVis = { display: visible ? "none" : "" };
  const showWhenVis = { display: visible ? "" : "none" };

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisiblity,
    };
  });

  return (
    <div>
      <div style={hideWhenVis}>
        <button onClick={toggleVisiblity}> {props.buttonLabel} </button>
      </div>
      <div style={showWhenVis}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";
export default Toggleable;
