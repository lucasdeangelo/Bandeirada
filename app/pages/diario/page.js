'use client'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flag from '../../components/flag';
import Options from '../../components/Options';
import country from '../../components/country';
import GameOverModal from '../../components/GameOverModal';
import MenuSuperior from '@/app/components/MenuSuperior';

const Diario = () => {
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [disabledInput, setDisabledInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const gameDisabled = localStorage.getItem('gameDisabled');
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    const today = new Date().toLocaleDateString();

    if (gameDisabled === 'true' && lastChallengeDate !== today) {    
      setShowAnswer(false);
      setDisabledInput(false);
      setIsInputEnabled(true);
      localStorage.removeItem('gameDisabled'); 
    } 
  }, []);
  
  useEffect(() => {
    const gameDisabled = localStorage.getItem('gameDisabled');
    if (gameDisabled === 'true') {
      setShowAnswer(true);
    } 
  }, []);

  useEffect(() => {
    const storedAttempts = localStorage.getItem('attemptsRemaining');
    if (storedAttempts) {
      setAttemptsRemaining(parseInt(storedAttempts));
    }
  }, []);

  useEffect(() => {
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    const today = new Date().toLocaleDateString();

    if (lastChallengeDate === today) {      
      const storedChallenge = localStorage.getItem('dailyChallenge');
      
      if (storedChallenge) {
        setDailyChallenge(JSON.parse(storedChallenge));
      }
      setIsLoading(false);
    } else {      
      generateNewChallenge();
      setIsInputEnabled(true);
    }
  }, []);
  
  const generateNewChallenge = () => {
    const countryCodesList = Object.keys(country);
    const randomIndex = Math.floor(Math.random() * countryCodesList.length);
    const countryCode = countryCodesList[randomIndex];
    const countryName = country[countryCode];
    const flagUrl = `https://flagcdn.com/${countryCode}.svg`;
    const newChallenge = ({ countryCode, countryName, flagUrl, correctAnswer: countryName })

    setDailyChallenge(newChallenge);

    localStorage.setItem('dailyChallenge', JSON.stringify(newChallenge));
        
    const today = new Date().toLocaleDateString();
    localStorage.setItem('lastChallengeDate', today);

    setIsLoading(false);
  };

  const handleInputChange = (inputValue) => {
    if (!disabledInput) {    
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
          setShowAnswer(true); 
          setDisabledInput(true);   
          setTimeout(() => {
            window.location.reload();
          }, 1000);  
          localStorage.setItem('gameDisabled', 'true');
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
          localStorage.setItem('attemptsRemaining', attemptsRemaining - 1);
          setAttemptsRemaining(prevAttempts => prevAttempts - 1);
        }
        if (attemptsRemaining === 1 && !isCorrect) {
          setGameOverModalOpen(true);
          setIsInputEnabled(false);
          localStorage.setItem('gameDisabled', 'true');
        }
      }
    } 
  };
  const handleGameOverModalClose = () => {
    setGameOverModalOpen(false);
    setShowAnswer(true);    
    setDisabledInput(true);
    localStorage.setItem('gameDisabled', 'true');
  };

  return (
    <div className='flex flex-col items-center justify-center overflow-hidden'>
      <MenuSuperior/>

      <div className='bg-azul rounded-2xl sm:w-[40dvh] md:w-[50dvh] 3xl:w-[60dvh] h-[60dvh] flex flex-col items-center mt-12'>
      <ToastContainer />

      {isLoading && <p className='mt-[50%] font-bold'>Carregando desafio...</p>}
      {!isLoading && dailyChallenge &&(
        <div className='flex flex-col justify-center items-center mt-12'>
          <Flag flagUrl={dailyChallenge.flagUrl} />
          {showAnswer &&(
            <p className='text-white font-bold sm:text-lg md:text-xl 3xl:text-2xl mt-2'>{dailyChallenge.countryName}</p>
          )}
          <p className='text-white font-bold text-sm mt-5'>Tentativas restantes: {attemptsRemaining}</p>
          
          <p className='text-white font-bold sm:text-lg md:text-xl 3xl:text-2xl my-5'>Qual é essa bandeira?</p>
          
          <Options
            handleInputChange={handleInputChange}
            countries={Object.values(country)}
            disabled={!isInputEnabled}                       
          />
        </div>        
      )}
      </div>      
      <GameOverModal isOpen={gameOverModalOpen} onClose={handleGameOverModalClose} />      
    </div>
  );
};

export default Diario;
