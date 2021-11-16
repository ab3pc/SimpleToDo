import React from "react";

function InputCheckBox({ id, name, setCategoty, category }) {
  const handleSetCategory = () => {
    setCategoty(id);
  };
  return (
    <div className="todo__sort-item">
      <span onClick={handleSetCategory} className={ id === category? "active": ''}>
        {name}
      </span>
    </div>
  );
}

export default InputCheckBox;
