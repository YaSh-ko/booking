import { useAuth } from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import './modal.scss';

export function Modal({open, onClose}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [isSentCode, setIsSentCode] = useState(false);
    const modalRef = useRef();
    const {sendCode, verifyCode, isLoading, error: apiError, clearError} = useAuth();
    const [localError, setLocalError] = useState('');

    useEffect(() => {
        const handleClickOutsideModal = (e) => {
            if(modalRef.current && !modalRef.current.contains(e.target) && open) onClose();
        }
        document.addEventListener('mousedown', handleClickOutsideModal);

    })
    useEffect(() => {
        if(localError) setLocalError('');
        if(apiError) clearError();

    }, [name, email, code]);
    const sendCodeAction = async (e) => {
        e.preventDefault();

        try {
            if(!email.trim() || !name.trim()) {
                setLocalError('Заполните имя и email');
            }
            await sendCode(email, name);
            setIsSentCode(true);
        } catch(err) {
            console.error(err);
        }
    }

    const verifyCodeAction = async (e) => {
        e.preventDefault();

        try {

            const result = await verifyCode(email, code);
            console.log(result);
            onClose();

        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
            {(apiError || localError) && (
                    <div className="modal__error">
                        {apiError || localError}
                        <button 
                            className="modal__error-close"
                            onClick={() => {
                                if (apiError) clearError();
                                if (localError) setLocalError('');
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

            {isSentCode ? (
                <form onSubmit={verifyCodeAction} className="modal__form">
                    <input placeholder="Введите код" value={code} onChange={(e) => setCode(e.target.value)} className="modal__input"/>
                    <button type="submit" className="modal__button">Войти</button>
                </form>
            ) : (
            <form onSubmit={sendCodeAction} className="modal__form">
                <input type="text" name='name' value={name} className="modal__input" placeholder="Введите имя" onChange={(e)=>setName(e.target.value)}/>
                <input type="email" name={email} value={email} className="modal__input" placeholder="Введите email" onChange={(e)=>setEmail(e.target.value)}/>

                
                <button type="submit" className="modal__button">Отправить код</button>
                
            </form>
            )}
            </div>            
        </div>
    )
}