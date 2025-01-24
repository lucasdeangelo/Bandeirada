import { useState, useEffect } from 'react';
import Image from 'next/image';
import send from '@/public/send.svg';

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const Options = ({ handleInputChange, countries, continent }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [gameDisabled, setGameDisabled] = useState(false);

  useEffect(() => {
    const isGameDisabled = localStorage.getItem('gameDisabled') === 'true';
    setGameDisabled(isGameDisabled);
  }, []);

  useEffect(() => {
    // Recupera o status do jogo para o continente específico
    const isGameDisabled = localStorage.getItem(`gameDisabled_${continent}`) === 'true';
    setGameDisabled(isGameDisabled);
  }, [continent]);
  
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
    if (!gameDisabled) {
      handleInputChange(country);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleSelectCountry = (country) => {
    if (!gameDisabled) {
    setInputValue(country);
    setSuggestions([]); 
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex'>
        <input
          className='bg-slate-100 text-slate-600 sm:text-md sm:w-[20dvh] md:w-[30dvh] sm:h-10 md:h-12 3xl:h-12 sm:pl-2 3xl:pl-6 sm:rounded-lg 3xl:rounded-xl'
          type="text"
          placeholder="Digite o nome do país"
          value={inputValue}
          onChange={handleChange}
          disabled={gameDisabled}
          />
        <button
          className='bg-slate-100 ml-2 sm:h-10 md:h-12 3xl:h-12 px-3 sm:rounded-lg 3xl:rounded-xl' 
          onClick={() => handleSubmit(inputValue)}
          disabled={gameDisabled}
        >
          <Image src={send} width={25} height={25} alt={'enviar'}/>
        </button>
      </div>
      <div className='flex flex-col mt-5'>
        {suggestions.length > 0 && (
          <ul className="bg-slate-100 border border-gray-300 text-black sm:text-sm sm:rounded-lg md:rounded-xl 3xl:rounded-xl sm:w-[20dvh] md:w-[30dvh] 3xl:w-[30dvh] max-w-[30dvh] max-h-48 overflow-y-auto">
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