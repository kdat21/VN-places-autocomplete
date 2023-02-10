import { AutoComplete, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { apiURL, removeDuplicatePlaces } from './utils';

const App = () => {
  const [options, setOptions] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      const { status, data } = await axios.get(`${apiURL}&q=${value}`);
      if (status === 200) {
        const newData = data.map(e => ({ value: e.display_name, lat: e.lat, lon: e.lon }));
        const newDataSet = removeDuplicatePlaces(newData, 'value');
        console.log(newDataSet);
        setOptions(newDataSet);
      }
    } catch (error) {
      console.log(error);
      setOptions([]);
    }
  };

  const onSelect = (value, option) => {
    const { lat, lon } = option;
    setLatitude(lat);
    setLongitude(lon);
    setSelectedAddress(value);
    console.log(option);
  }

  return (
    <div className='container'>
      Địa chỉ
      <AutoComplete
        style={{ width: '100%', marginTop: 10, marginBottom: 5 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input.Search size="large" placeholder="input here" enterButton />
      </AutoComplete>
      {selectedAddress}
      <div className='latlon-container'>
        <div className='latlon-child'>
          Vĩ độ
          <Input size="large" value={latitude} disabled />
        </div>
        <div className='latlon-child'>
          Kinh độ
          <Input size="large" value={longitude} disabled />
        </div>
      </div>
    </div>
  )
}

export default App