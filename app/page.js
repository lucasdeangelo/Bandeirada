'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flag from './components/flag';
import Options from './components/Options';
import country from './components/country';
import GameOverModal from './components/GameOverModal';
import logo from '@/public/logo.svg';
import mais from '@/public/mais.svg';

const Home = () => {
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);

  useEffect(() => {
    generateNewChallenge();
  }, []);
  
  const generateNewChallenge = () => {
    const countryCodesList = Object.keys(country);
    if (countryCodesList.length === 0) {
      console.error('Lista de códigos de países vazia. Não foi possível gerar o desafio.');
      return;
    }
    const randomIndex = Math.floor(Math.random() * countryCodesList.length);
    const countryCode = countryCodesList[randomIndex];
    const countryName = country[countryCode];
    const flagUrl = `https://flagcdn.com/${countryCode}.svg`;

    setDailyChallenge({ countryCode, countryName, flagUrl, correctAnswer: countryName });
    setIsLoading(false);
  };

  const handleInputChange = (inputValue) => {
    if (dailyChallenge && dailyChallenge.correctAnswer) {
      const isCorrect = inputValue.toLowerCase() === dailyChallenge.correctAnswer.toLowerCase();
      if (isCorrect) {     
        toast.success('Resposta Correta!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"        
        });      
      } else {       
        toast.error('Resposta incorreta. Tente novamente.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"        
        });        
        setAttemptsRemaining(prevAttempts => prevAttempts - 1);
      }
    } 
    if (attemptsRemaining === 1) {
      setGameOverModalOpen(true);
    }
  };
  const handleGameOverModalClose = () => {
    setGameOverModalOpen(false);
    setTimeout(() => {
      window.location.reload();
      setIsLoading(true)
    }, 200);
  };
    
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex justify-center mt-4'>
        <div className='flex justify-center items-center'>
          <p className='text-black font-bold text-2xl'>Diário</p>
          <p className='text-black font-bold text-2xl ml-20'>Continentes</p>
        </div>
        <Image className='ml-20' src={logo} width={100} height={100} alt={'logo-bandeirada'}/>
        <div className='flex justify-center items-center'>
          <p className='text-black font-bold text-2xl ml-20'>Como Jogar</p>
          <div className='flex'>
            <p className='text-black font-bold text-2xl ml-20'>Mais</p>
            <Image className='ml-4' src={mais} width={25} height={25} alt={'mais'}/>
          </div>
        </div>
      </div>

      <div className='bg-azul rounded-2xl w-[60dvh] h-[60dvh] flex flex-col items-center mt-20'>
      <ToastContainer />
      {isLoading && <p className='mt-[50%] font-bold'>Carregando desafio...</p>}
      {!isLoading && dailyChallenge && (
        <div className='flex flex-col justify-center items-center mt-12'>
          <Flag flagUrl={dailyChallenge.flagUrl} />
          
          <p className='text-white font-bold text-sm mt-5'>Tentativas restantes: {attemptsRemaining}</p>
          
          <p className='text-white font-bold text-2xl my-5'>Qual é essa bandeira?</p>
          
          <Options
            handleInputChange={handleInputChange}                       
          />
        </div>        
      )}
      </div>
      <GameOverModal isOpen={gameOverModalOpen} onClose={handleGameOverModalClose} />      
    </div>
  );
};

export default Home;
