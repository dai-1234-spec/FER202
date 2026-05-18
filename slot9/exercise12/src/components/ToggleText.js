import React, { useState } from 'react';

const ToggleText = () => {
  const [isVisible, SetIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => SetIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <p>Toggle me!</p>}
    </div>
  );
};

export default ToggleText;
