'use client'
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Flag from '../../components/flag';
import Options from '../../components/Options';
import country from '../../components/country';
import GameOverModal from '../../components/GameOverModal';
import MenuSuperior from '../../components/MenuSuperior';

const continents = {
    África: [
    "dz", "ao", "bj", "bw", "bf", "bi", "cv", "cm", "cf", "td", "km", "cg", "cd", 
    "dj", "eg", "gq", "er", "sz", "et", "ga", "gm", "gh", "gn", "gw", "ke", "ls", 
    "lr", "ly", "mg", "mw", "ml", "mr", "mu", "ma", "mz", "na", "ne", "ng", "rw", 
    "sh", "st", "sn", "sc", "sl", "so", "za", "ss", "sd", "tz", "tg", "tn", "ug", 
    "eh", "zm", "zw"
  ],
  Ásia: [
    "af", "am", "az", "bh", "bd", "bt", "bn", "kh", "cn", "cy", "ge", "in", "id", 
    "ir", "iq", "il", "jp", "jo", "kz", "kw", "kg", "la", "lb", "my", "mv", "mn", 
    "mm", "np", "kp", "om", "pk", "ps", "ph", "qa", "sa", "sg", "kr", "lk", "sy", 
    "tw", "tj", "th", "tl", "tr", "tm", "ae", "uz", "vn", "ye"
  ],
  Europa: [
    "ax", "ad", "at", "al", "ba", "be", "bg", "by", "cy", "ch", "cz", "de", "dk", 
    "ee", "es", "fi", "fr", "gb", "ge", "gi", "gr", "hr", "hu", "im", "fo", "ie", 
    "is", "it", "je", "xk", "li", "lt", "lu", "lv", "mc", "md", "me", "mk", "mt", 
    "nl", "no", "pl", "pt", "ro", "rs", "sm", "ru", "se", "si", "sk", "tr", "ua", 
    "va"
  ],
  AméricadoSul: [
    "ar", "bo", "br", "cl", "co", "ec", "fk", "gy", "pe", "py", "sr", "tt", "uy", 
    "ve"
  ],
  AméricadoNorte: [
    "ai", "ag", "aw", "bs", "bb", "bz", "bm", "ca", "ky", "cr", "cu", "cw", "dm", 
    "do", "sv", "us", "gl", "gd", "gp", "gt", "ht", "hn", "mq", "mx", "ms", "ni", 
    "pa", "pr", "bl", "kn", "lc", "pm", "vc", "sx", "tc", "vg", "vi"
  ],
  Oceania: [
    "au", "nz", "fj", "pg", "sb", "vu", "nc", "wf", "ck", "nu", "to", "ws", "tk", 
    "fm", "mh", "pw", "ki", "tv", "nr"
  ]
};

  
const generateChallenge = (continent) => {
    const countryCodesList = continents[continent];
    const randomIndex = Math.floor(Math.random() * countryCodesList.length);
    const countryCode = countryCodesList[randomIndex];
    const countryName = country[countryCode];
    const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
  
    return { countryCode, countryName, flagUrl, correctAnswer: countryName };
  };
  
  const ContinentChallenge = ({ continent, setResetGame, setAllContinentsCompleted }) => {
    const [challenge, setChallenge] = useState(null);
    const [attemptsRemaining, setAttemptsRemaining] = useState(3);
    const [dailyAttemptsRemaining, setDailyAttemptsRemaining] = useState(1);
    const [showAnswer, setShowAnswer] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [gameOverModalOpen, setGameOverModalOpen] = useState(false);
  
    useEffect(() => {
      // Verifica a data e reseta o jogo no dia seguinte
      const lastPlayedDate = localStorage.getItem(`lastPlayedDate_${continent}`);
      const today = new Date().toLocaleDateString();
  
      if (lastPlayedDate !== today) {
        localStorage.setItem(`lastPlayedDate_${continent}`, today);
        setDailyAttemptsRemaining(1); // Reset tentaivas do dia
        setAttemptsRemaining(3); // Reset tentaivas do continente
        setResetGame(true); // Indica que o jogo foi resetado
      } else {
        setResetGame(false); // Não resetar o jogo no mesmo dia
      }
  
      // Checa se já existe um desafio salvo no localStorage para esse continente
      const savedChallenge = localStorage.getItem(`savedChallenge_${continent}`);
      const savedAttempts = localStorage.getItem(`savedAttemptsRemaining_${continent}`);
      const savedDailyAttempts = localStorage.getItem(`savedDailyAttemptsRemaining_${continent}`);
      const savedInputDisabled = localStorage.getItem(`savedInputDisabled_${continent}`);
  
      if (savedChallenge) {
        setChallenge(JSON.parse(savedChallenge));
        setAttemptsRemaining(savedAttempts ? parseInt(savedAttempts) : 3);
        setDailyAttemptsRemaining(savedDailyAttempts ? parseInt(savedDailyAttempts) : 1);
        setDisabledInput(savedInputDisabled === 'true');
      } else {
        const newChallenge = generateChallenge(continent);
        setChallenge(newChallenge);
        localStorage.setItem(`savedChallenge_${continent}`, JSON.stringify(newChallenge));
      }
    }, [continent]);
  
    const handleInputChange = (inputValue) => {      
        if (challenge) {
          const isCorrect = inputValue.toLowerCase() === challenge.correctAnswer.toLowerCase();
      
          if (isCorrect) {
            toast.success('Resposta Correta!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored"
            });
      
            setShowAnswer(true);
            setDisabledInput(true);
            localStorage.setItem(`inputDisabled_${continent}`, 'true');
      
            // Verifica se todos os continentes foram concluídos
            const allContinentsCompleted = Object.keys(continents).every(cont => 
              localStorage.getItem(`gameDisabled_${cont}`) === 'true'
            );
      
            if (allContinentsCompleted) {
              toast.success('Parabéns! Você acertou todos os continentes!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
              });
      
              // Bloquear input até o próximo dia
              localStorage.setItem('gameCompletedToday', 'true');
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          } else {
            toast.error('Resposta incorreta. Tente novamente.', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored"
            });
      
            const newAttempts = attemptsRemaining - 1;
            setAttemptsRemaining(newAttempts);
            localStorage.setItem(`attemptsRemaining_${continent}`, newAttempts);
      
            if (newAttempts <= 0) {
              toast.error('Tentativas esgotadas para este continente!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"
              });
      
              setDisabledInput(true);
              localStorage.setItem(`gameDisabled_${cont}`, 'true');
      
              if (dailyAttemptsRemaining <= 1) {
                setGameOverModalOpen(true);
                localStorage.setItem('gameCompletedToday', 'true');
              }
            }
          }
        }
      };
      
      // Verifica e aplica a lógica de bloqueio do input após reload
      useEffect(() => {
        const savedDisabled = localStorage.getItem(`inputDisabled_${continent}`) === 'true';
        setDisabledInput(savedDisabled);
      
        const gameCompleted = localStorage.getItem('gameCompletedToday') === 'true';
        if (gameCompleted) {
          setDisabledInput(true);
        }
      }, []);
      
  
    const handleNextDay = () => {
      setDailyAttemptsRemaining(1);
      setAttemptsRemaining(3);
      setGameOverModalOpen(false);
      setDisabledInput(false);
      localStorage.setItem(`savedInputDisabled_${continent}`, 'false');
      const newChallenge = generateChallenge(continent);
      setChallenge(newChallenge);
      localStorage.setItem(`savedChallenge_${continent}`, JSON.stringify(newChallenge));
      localStorage.setItem(`savedAttemptsRemaining_${continent}`, 3);
      localStorage.setItem(`savedDailyAttemptsRemaining_${continent}`, 1);
    };
  
    return (
      <div className="bg-azul rounded-2xl w-[40dvh] h-[60dvh] flex flex-col items-center p-5 m-5">
        {challenge ? (
          <>
            <Flag flagUrl={challenge.flagUrl} />
            {showAnswer && <p className="text-white font-bold text-xl mt-2">{challenge.countryName}</p>}
            <p className="text-white font-bold text-sm mt-5">Tentativas restantes: {attemptsRemaining}</p>
            <p className="text-white font-bold text-lg my-5">Qual é essa bandeira do continente {continent}?</p>
            <Options
              handleInputChange={handleInputChange}
              countries={Object.values(country)}
              disabled={disabledInput}
            />
            <GameOverModal isOpen={gameOverModalOpen} onClose={handleNextDay} />
          </>
        ) : (
          <p className="text-white font-bold">Carregando...</p>
        )}
      </div>
    );
  };
  
  const MultiplosDesafios = () => {
    const [resetGame, setResetGame] = useState(false);
    const [allContinentsCompleted, setAllContinentsCompleted] = useState(false);
  
    return (
      <div className="flex flex-col items-center">
        <MenuSuperior />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {Object.keys(continents).map((continent) => (
            <ContinentChallenge 
              key={continent} 
              continent={continent} 
              setResetGame={setResetGame} 
              setAllContinentsCompleted={setAllContinentsCompleted}
            />
          ))}
        </div>
        <ToastContainer />
      </div>
    );
  };
  
  export default MultiplosDesafios;
  