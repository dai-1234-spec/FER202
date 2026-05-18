import React, { useState } from 'react';

const ControlledInput = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <p>Input text: {value}</p>
    </div>
  );
};

export default ControlledInput;