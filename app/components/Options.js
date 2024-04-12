import { useState } from 'react';
import Image from 'next/image';
import send from '@/public/send.svg';

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const Options = ({ handleInputChange, countries }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const normalizedInput = removeAccents(value.toLowerCase());
    if (Array.isArray(countries)) {
      const filteredSuggestions = countries.filter((country) =>
        typeof country === 'string' && removeAccents(country.toLowerCase()).includes(normalizedInput)
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSubmit = (country) => {
    handleInputChange(country);
    setInputValue('');
    setSuggestions([]);
  };

  const handleSelectCountry = (country) => {
    setInputValue(country);
    setSuggestions([]); 
  };

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input
          className='bg-slate-100 text-slate-600 h-12 pl-6 rounded-xl'
          type="text"
          placeholder="Digite o nome do país"
          value={inputValue}
          onChange={handleChange}
          />
        <button
          className='bg-slate-100 ml-2 h-12 px-3 rounded-xl' 
          onClick={() => handleSubmit(inputValue)}
        >
          <Image src={send} width={25} height={25} alt={'enviar'}/>
        </button>
      </div>
      <div className='flex mt-5'>
        {suggestions.length > 0 && (
          <ul className="bg-slate-100 border border-gray-300 text-black rounded-xl w-[32dvh] max-w-[32dvh] max-h-48 overflow-y-auto">
            {suggestions.map((country, index) => (
              <li
              key={index}
              className="px-6 py-2 cursor-pointer hover:bg-gray-300"
              onClick={() => handleSelectCountry(country)}
              >
                {country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Options;