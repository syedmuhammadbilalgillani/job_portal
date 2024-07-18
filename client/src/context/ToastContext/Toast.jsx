// src/Toast.js
import React, { useState, useEffect } from 'react';
import './toast.css';

const Toast = ({ message, type, onClose, duration = 2000 }) => { // Corrected duration from 20000000 to 2000
    const [show, setShow] = useState(true);

    useEffect(() => {
        const autoHide = setTimeout(handleClose, duration);

        return () => clearTimeout(autoHide);
    }, [duration]);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);  // wait for animation to finish before calling onClose
    };

    return (
        <div className={`toast-parent ${show ? 'show' : 'hide'}`}>
            <div className={`toast ${type}`}>
                <div className="toast-content flex items-center gap-2 ">
                    <span className='font-semibold font-mono'>{message}</span>
                    <button className="close-button" onClick={handleClose}>
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
