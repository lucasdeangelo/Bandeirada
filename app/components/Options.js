import { useState } from 'react';
import Image from 'next/image';
import send from '@/public/send.svg'

const Options = ({ handleInputChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    handleInputChange(inputValue);
    setInputValue('');
  };

  return (
    <div className='flex'>
      <input
        className='bg-slate-100 text-slate-600 h-12 pl-4 rounded-xl'
        type="text"
        placeholder="Digite o nome do país"
        value={inputValue}
        onChange={handleChange}
      />
      <button
        className='bg-slate-100 ml-2 h-12 px-3 rounded-xl' 
        onClick={handleSubmit}
      ><Image src={send} width={25} height={25} alt={'enviar'}/></button>
    </div>
  );
};

export default Options;