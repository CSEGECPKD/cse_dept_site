import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-[12%] right-[4%] md:top-[16%] md:right-[32%] p-3 bg-white text-black rounded-sm"
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
