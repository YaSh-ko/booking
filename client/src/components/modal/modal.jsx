import { useAuth } from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import "./modal.scss";
import { Loader } from "../loader/Loader";
import { useUserContext } from "../../context/userContext";

export function Modal({ open, onClose }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [isSentCode, setIsSentCode] = useState(false);
    const modalRef = useRef();
    const { sendCode, verifyCode, isLoading, error: apiError, clearError } = useAuth();
    const [localError, setLocalError] = useState("");
    const {login} = useUserContext();

    useEffect(() => {
        const handleClickOutsideModal = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target) && open) onClose();
        };
        document.addEventListener("mousedown", handleClickOutsideModal);
    });

    useEffect(() => {
        if (localError) setLocalError("");
        if (apiError) clearError();
    }, [name, email, code]);

    const handleSubmit = async (e, resent = false) => {
        e.preventDefault();

        try {
            if (!isSentCode || resent) {
                // Этап отправки кода
                if (!email.trim() || !name.trim()) {
                    setLocalError("Заполните имя и email");
                    return;
                }

                await sendCode(email, name);
                setIsSentCode(true);
            } else {
                // Этап отправки кода подтверждения
                const user =  await verifyCode(email, code);
                login(user);
                onClose();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
                <h2 className="modal__title">Вход</h2>

                {(apiError || localError) && (
                    <div className="modal__error">
                        {apiError || localError}
                        <button
                            className="modal__error-close"
                            onClick={() => {
                                if (apiError) clearError();
                                if (localError) setLocalError("");
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <Loader />
                ) : (

                    <form onSubmit={handleSubmit} className="modal__form">

                        {/* поле имя */}
                        <input
                            type="text"
                            name="name"
                            value={name}
                            className="modal__input"
                            placeholder="Введите имя"
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSentCode} // имя блокируем после отправки
                        />

                        {/* поле email */}
                        <input
                            type="email"
                            value={email}
                            className="modal__input"
                            placeholder="Введите email"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSentCode} // email тоже блокируем
                        />

                        {/* добавляем поле кода ТОЛЬКО после отправки */}
                        {isSentCode && (
                            <input
                                placeholder="Введите код"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="modal__input"
                            />
                        )}

                        {isSentCode && 
                        <div className="modal__actions">
                            <button onClick={()=> setIsSentCode(false)}>Вернуться назад</button>
                            <button onClick={(e)=> 
                                handleSubmit(e, true)
                            }>Отправить код еще раз</button>
                        </div>
                        }

                        <button type="submit" className="modal__button">
                            {isSentCode ? "Войти" : "Отправить код"}
                        </button>
                    </form>
                )}
                
            </div>
        </div>
    );
}
