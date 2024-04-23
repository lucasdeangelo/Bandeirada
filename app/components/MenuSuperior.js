import React, { useState } from 'react'
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import Image from 'next/image'
import Link from 'next/link'
import Mais from '../components/Mais';
import ComoJogar from '../components/ComoJogar';
import logo from '@/public/logo.svg';
import mais from '@/public/mais.svg';
import close from '@/public/close.svg'

function MenuSuperior() {
    const [menuOpen, setMenuOpen] = useState(false);
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
        <div className='3xl:hidden flex justify-center items-center'>
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                <Image src={menuOpen ? close : mais} width={40} height={40} alt={menuOpen ? 'fechar' : 'mais'}/>
            </button>
                <Image className={`sm:ml-48 md:ml-[35dvh] ${menuOpen ? 'hidden' : 'block'}`} src={logo} width={100} height={100} alt={'logo-bandeirada'}/>

        </div>

        <div className={`flex justify-center items-center ${menuOpen ? 'block' : 'hidden'} sm:flex-col 3xl:block`}>
            <div className='flex sm:flex-col xl: 3xl:flex-row 3xl:justify-center 3xl:items-center'>
                <Link className='text-black font-bold text-2xl sm:ml-20 sm:mt-2' href={"/../pages/diario"}>Diário</Link>

                <Link className='text-black font-bold text-2xl ml-20 sm:mt-1' href={"/../pages/continentes"}>Continentes</Link>
                
                <Image className='ml-20 sm:hidden md:hidden 3xl:block' src={logo} width={100} height={100} alt={'logo-bandeirada'}/>
                
                <button className='text-black font-bold text-2xl ml-20 sm:mt-1' onClick={handleComoJogarModalOpen}>Como Jogar</button>

                <div className='flex cursor-pointer sm:mt-1' onClick={handleMaisModalOpen}>
                    <button className='text-black font-bold text-2xl ml-20'>Mais</button>
                    <Image className='ml-4' src={mais} width={25} height={25} alt={'mais'}/>
                </div>
            </div>
        </div>               
        
        <Mais maisModalisOpen={maisModalOpen} maisModalisClose={handleMaisModalClose}/>
        <ComoJogar comoModalisOpen={comoJogarModalOpen} comoModalisClose={handleComoJogarModalClose}/>
      </div>
    </motion.main>
  )
}

export default MenuSuperior