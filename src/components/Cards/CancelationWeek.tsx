import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, TrendingDown, TrendingUp, XCircle } from "lucide-react";
import { format } from 'date-fns';

interface ToastMessage {
    type: string;
    title: string;
    message: string;
    ariaLevel: string;
}

interface ToastComponentProps {
    message: ToastMessage;
    type: string;
    onClose: () => void;
}

interface ToastProps {
    value: string;
    type: string;
}

export function CancelationWeek() {
    const [currentValue, setCurrentValue] = useState(50);
    const [showToast, setShowToast] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const toastRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef(null);
    const lastEmailSentRef = useRef<number>(0); // timestamp do último envio

    const generateRandomValue = () => {
        return Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    };

    const getCardData = (value: number) => {
        if (value <= 70) {
            return {
                level: 'baixo',
                colorCard: 'bg-green-100 text-green-500',
                borderCard: "border-l-green-500",
                criticalMessage: 'Nível normal - Padrão',
                toastType: 'success'
            };
        } else if (value <= 70) {
            return {
                level: 'moderado',
                colorCard: 'bg-yellow-100 text-yellow-500',
                borderCard: 'border-l-yellow-500',
                criticalMessage: 'Nível médio - Atenção',
                toastType: 'warning'
            };
        } else {
            return {
                level: 'alto',
                colorCard: 'bg-red-100 text-red-500',
                borderCard: 'border-l-red-500',
                criticalMessage: 'Nível crítico - Ação Recomendada',
                criticalColor: 'text-red-600',
                toastType: 'error'
            };
        }
    };

    const getToastMessage = ({ value, type }: ToastProps) => {
        if (type === 'success') {
            return {
                type: 'success',
                title: 'Situação Positiva',
                message: `Cancelamentos baixos: ${value} esta semana. Desempenho excelente!`,
                ariaLevel: 'polite'
            };
        } else if (type === 'warning') {
            return {
                type: 'warning',
                title: 'Atenção Necessária',
                message: `Cancelamentos moderados: ${value} esta semana. Recomendado monitoramento.`,
                ariaLevel: 'polite'
            };
        } else {
            return {
                type: 'error',
                title: 'Situação Crítica',
                message: `Cancelamentos altos: ${value} esta semana. Intervenção recomendada.`,
                ariaLevel: 'assertive'
            };
        }
    };

    const sendEmailAlert = async (value: number) => {
        try {
            const now = Date.now();
            const oneMinute = 60 * 1000;

            // Impede envio múltiplo dentro de 1 minuto
            if (now - lastEmailSentRef.current < oneMinute) return;

            await fetch("https://formspree.io/f/mgvzaaqn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: "sistemagrenciamentodecancelamento@nmutlifibra.com.br",
                    message: `⚠️ NMULTIFIBRA:  ALERTA: Os cancelamentos chegaram a ${value} esta semana. Situação crítica! ${format(now, "dd/MM/yyyy")}`
                })
            });
            console.log("E-mail enviado com sucesso");
            lastEmailSentRef.current = now;
        } catch (error) {
            console.error("Erro ao enviar o e-mail:", error);
        }
    };

    const Toast = ({ message, type, onClose }: ToastComponentProps) => {
        const getToastIcon = () => {
            switch (type) {
                case 'success':
                    return <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />;
                case 'warning':
                    return <AlertTriangle className="h-5 w-5 text-yellow-600" aria-hidden="true" />;
                case 'error':
                    return <XCircle className="h-5 w-5 text-red-600" aria-hidden="true" />;
                default:
                    return <AlertTriangle className="h-5 w-5 text-gray-600" aria-hidden="true" />;
            }
        };

        const getToastColors = () => {
            switch (type) {
                case 'success':
                    return 'bg-green-100 border-green-300 text-green-800';
                case 'warning':
                    return 'bg-yellow-100 border-yellow-300 text-yellow-800';
                case 'error':
                    return 'bg-red-100 border-red-300 text-red-800';
                default:
                    return 'bg-gray-100 border-gray-300 text-gray-800';
            }
        };

        useEffect(() => {
            if (toastRef.current) {
                toastRef.current.focus();
            }
        }, []);

        return (
            <div
                ref={toastRef}
                role="alert"
                aria-live={message.ariaLevel as "polite" | "assertive" | "off"}
                className={`fixed bottom-10 right-4 z-50 max-w-md p-4 rounded-lg border-2 shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${getToastColors()}`}
                tabIndex={-1}
            >
                <div className="flex items-start">
                    <div className="flex-shrink-0">{getToastIcon()}</div>
                    <div className="ml-3 flex-1">
                        <h3 className="text-sm font-semibold">{message.title}</h3>
                        <p className="text-sm mt-1">{message.message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 p-1 rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        aria-label="Fechar notificação"
                    >
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const updateValue = () => {
            const newValue = generateRandomValue();
            setCurrentValue(newValue);
            setIsAnimating(true);
            setShowToast(true);

            setTimeout(() => setIsAnimating(false), 1000);
            setTimeout(() => setShowToast(false), 5000);

            const cardData = getCardData(newValue);

            if (newValue >= 85) {
                sendEmailAlert(newValue);
            }

            if (cardRef.current) {
                const announcement = `Cancelamentos atualizados para ${newValue}. Nível ${cardData.level}.`;
                const ariaLive = document.createElement('div');
                ariaLive.setAttribute('aria-live', 'polite');
                ariaLive.setAttribute('aria-atomic', 'true');
                ariaLive.className = 'sr-only';
                ariaLive.textContent = announcement;
                document.body.appendChild(ariaLive);
                setTimeout(() => document.body.removeChild(ariaLive), 1000);
            }
        };
        //1 em 1 hora
        const interval = setInterval(updateValue, 3600000);

        return () => clearInterval(interval);
    }, []);


    function getIconByLevel(level: string) {
        switch (level) {
            case "crítico":
                return <AlertTriangle className="text-red-600 w-12 h-12" />;
            case "alto":
                return <TrendingUp className="text-orange-500 w-12 h-12" />;
            case "normal":
                return <CheckCircle className="text-green-500 w-12 h-12" />;
            case "baixo":
                return <TrendingDown className="text-emerald-500 w-12 h-12" />;
            default:
                return null;
        }
    }


    const cardData = getCardData(currentValue);
    const toastMessage = getToastMessage({ value: String(currentValue), type: cardData.toastType });

    return (
        <>
            <div
                ref={cardRef}
                className={`p-6 rounded-lg shadow-md border-l-4 ${cardData.borderCard} transition-all duration-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${isAnimating ? 'scale-105 shadow-xl' : ''}`}
                role="region"
                aria-labelledby="cancellation-title"
                aria-describedby="cancellation-description"
            >
                <div className="space-y-3">
                    <h2 id="cancellation-title" className="text-xl font-bold">
                        Cancelamentos (semanal)
                    </h2>
                    <div className="flex justify-between items-center gap-3">
                        <div className='flex items-center gap-3'>
                            <span
                                className={`text-4xl font-bold text-gray-900 transition-all duration-500 ${isAnimating ? 'scale-110' : ''}`}
                                aria-label={`${currentValue} cancelamentos`}
                            >
                                {currentValue}
                            </span>

                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${cardData.colorCard}`}>
                                Nível {cardData.level}
                            </span>
                        </div>
                        {getIconByLevel(cardData.level)}
                    </div>
                    {cardData && (
                        <div className="flex items-center gap-2" role="alert" aria-live="polite">
                            <div className={`${cardData.colorCard} h-2 w-2 rounded-full`} aria-hidden="true"></div>
                            <span className={`text-sm p-1 rounded font-medium ${cardData.colorCard}`}>
                                {cardData.criticalMessage}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastMessage.type}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}
