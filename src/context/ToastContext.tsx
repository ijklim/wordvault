import { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastContextType {
  setMessage: (message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState('');

    const toastMessage = (msg?: string) => {
        setMessage(msg || '');
    };

    return (
        <ToastContext.Provider value={{ setMessage: toastMessage }}>
            {children}
            {message && (
                <ToastContainer className="p-3" style={{position:'fixed', left:'10px', bottom:'10px', zIndex: 1050}}>
                    <Toast show={true} style={{background:'rgba(75, 75, 75, .8)', color:'white', width:'300px'}}>
                        <Toast.Body>{message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </ToastContext.Provider>
    );
};
