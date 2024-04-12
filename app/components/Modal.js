import ReactModal from 'react-modal';

const Modal = ({ isOpen, onClose }) => {
  return (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Resposta correta!"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div className="bg-white p-6 rounded-lg max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4">Resposta correta!</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </ReactModal>
  );
};

export default Modal;
