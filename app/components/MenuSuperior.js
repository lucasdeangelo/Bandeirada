import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link'
import Mais from '../components/Mais';
import ComoJogar from '../components/ComoJogar';
import logo from '@/public/logo.svg';
import mais from '@/public/mais.svg';

function MenuSuperior() {
    const [maisModalOpen, setMaisModalOpen] = useState(false);
    const [comoJogarModalOpen, setComoJogarModalOpen] = useState(false);

    const handleMaisModalOpen = () => {
        setMaisModalOpen(true);
    }

    const handleMaisModalClose = () => {
        setMaisModalOpen(false);
    }

    const handleComoJogarModalOpen = () => {
        setComoJogarModalOpen(true);
    }

    const handleComoJogarModalClose = () => {
        setComoJogarModalOpen(false);
    }
  return (
    <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className=''
  >    
    <div className='flex justify-center mt-4'>
        <div className='flex justify-center items-center'>
          <Link className='text-black font-bold text-2xl' href={"/../pages/diario"}>Diário</Link>
          <Link className='text-black font-bold text-2xl ml-20' href={"/../pages/continentes"}>Continentes</Link>
        </div>
        <Image className='ml-20' src={logo} width={100} height={100} alt={'logo-bandeirada'}/>
        <div className='flex justify-center items-center'>
          <button className='text-black font-bold text-2xl ml-20' onClick={handleComoJogarModalOpen}>Como Jogar</button>
          <div className='flex cursor-pointer' onClick={handleMaisModalOpen}>
            <button className='text-black font-bold text-2xl ml-20'>Mais</button>
            <Image className='ml-4' src={mais} width={25} height={25} alt={'mais'}/>
          </div>
        </div>
        
        <Mais maisModalisOpen={maisModalOpen} maisModalisClose={handleMaisModalClose}/>
        <ComoJogar comoModalisOpen={comoJogarModalOpen} comoModalisClose={handleComoJogarModalClose}/>
      </div>
    </motion.main>
  )
}

export default MenuSuperior