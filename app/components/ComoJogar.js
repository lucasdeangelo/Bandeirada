import React from 'react'
import Modal from 'react-modal';

const ComoJogar = ({comoModalisOpen, comoModalisClose}) => {
  return (
    <Modal
      className='flex flex-col items-center'
      isOpen={comoModalisOpen}
      onRequestClose={comoModalisClose}
      contentLabel="Como Jogar"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          margin: 'auto',
          width: '50%', 
          maxHeight: '50%',
          overflow: 'auto'
        }
      }}
    >
      <div className="flex flex-col justify-center self-center bg-azul p-14 rounded-lg">
        <h2 className='text-center font-bold text-3xl'>Como Jogar</h2>
        <p className='text-center font-bold text-1xl mt-4'>Tente acertar a bandeira do país, você tem 3 chances para acertar.</p>
        <button className='text-center text-lg mt-11' onClick={comoModalisClose}>Fechar</button>
      </div>
    </Modal>
  )
}

export default ComoJogar