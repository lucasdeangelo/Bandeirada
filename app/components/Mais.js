import React from 'react'
import Modal from 'react-modal';
import Link from 'next/link'

const Mais = ({maisModalisOpen, maisModalisClose}) => {
  return (
    <Modal
      className='flex flex-col items-center'
      isOpen={maisModalisOpen}
      onRequestClose={maisModalisClose}
      contentLabel="Mais"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          margin: 'auto',
          width: '60%', 
          maxHeight: '60%'
        }
      }}
    >
      <div className="flex flex-col justify-center self-center bg-azul p-14 rounded-lg">
        <h2 className='text-center font-bold text-3xl'>Mais</h2>
        <p className='text-center font-bold text-1xl mt-4'>Acompanhe o projeto no <Link className='text-xl italic hover:text-slate-200' href={'https://github.com/lucasdeangelo/Bandeirada'}>Github</Link></p>
        <button className='text-center text-lg mt-11' onClick={maisModalisClose}>Fechar</button>
      </div>
    </Modal>
  )
}

export default Mais