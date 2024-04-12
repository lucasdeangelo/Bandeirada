import React, { useState } from 'react';
import Modal from 'react-modal';

const GameOverModal = ({ isOpen, onClose }) => {
  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Modal
      className='flex flex-col items-center'
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Game Over"
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
        <h2 className='text-center font-bold text-3xl'>Game Over</h2>
        <p className='text-center font-bold text-1xl mt-4'>Você excedeu o número de tentativas permitidas.</p>
        <button className='text-center text-lg mt-11' onClick={handleCloseModal}>Fechar</button>
      </div>
    </Modal>
  );
};

export default GameOverModal;
