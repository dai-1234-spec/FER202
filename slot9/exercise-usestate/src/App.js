import React from 'react';
import Counter from './components/Counter';
import PersonalInfo from './components/PersonalInfo';
import ProductListCheckbox from './components/ProductListCheckbox';
import ProductListRadio from './components/ProductListRadio';

function App() {
  return (
    <div>
      <h1>Ứng Dụng useState</h1>
      <h2>Ví dụ 1: Bộ Đếm</h2>
      <Counter />
      <h2>Ví dụ 2: Thông Tin Cá Nhân</h2>
      <PersonalInfo />
      <h2>Ví dụ 3: Chọn Nhiều Sản Phẩm</h2>
      <ProductListCheckbox />
      <h2>Ví dụ 4: Chọn Một Sản Phẩm</h2>
      <ProductListRadio />
    </div>
  );
}

export default App;