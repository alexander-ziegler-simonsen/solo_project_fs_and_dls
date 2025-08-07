import React, { useEffect, useState } from 'react';
import './Modal.css';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTriangleExclamation, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type ModalType = 'alert' | 'confirmation' | 'multi-option' | 'form-input' | 'custom';

type FormHandler = (formData: { [key: string]: string }) => void | Promise<void>;
type BasicHandler = () => void | Promise<void>;

export interface ModalProps {
    type: ModalType;
    title?: string;
    icon?: React.ReactNode;
    iconType?: 'success' | 'error' | 'info' | 'warning';
    titleType?: 'success' | 'error' | 'info' | 'warning' | `#${string}`;
    body?: React.ReactNode;
    customOptions?: {
        name: string;
        type?: 'primary' | 'danger' | 'secondary';
        onClick: () => void | Promise<void>;
    }[];
    confirmText?: string;
    onConfirm?: FormHandler | BasicHandler;
    onClose?: () => void;
    options?: {
        name: string;
        type?: 'primary' | 'danger' | 'secondary';
        onChosen: () => void | Promise<void>;
    }[];
    fields?: { name: string; type: string; label?: string; placeholder?: string; values?: string[]; initValue?: string }[];
}

const iconMap = {
    success: faCheckCircle,
    error: faExclamationCircle,
    info: faInfoCircle,
    warning: faTriangleExclamation,
};

const titleColorMap: Record<string, string> = {
    success: '#16a34a',
    error: '#dc2626',
    info: '#2563eb',
    warning: '#f59e0b',
};

const ModalRenderer: React.FC<ModalProps> = ({
    type,
    title,
    icon,
    iconType,
    titleType,
    body,
    customOptions,
    confirmText = 'Okay',
    onConfirm,
    onClose,
    options,
    fields,
}) => {
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState<{ [key: string]: string }>({});

    // if we have a init value, place it in our state
    useEffect(() => {
        if (fields) {
            fields.forEach(element => {
                if(element.initValue && element.name)
                {
                    let temp = element.initValue;
                    setFormState((prev) => ({ ...prev, [element.name]: temp }));
                }
            });
        }
    }, []);


    const [closing, setClosing] = useState(false);

    const handleAction = async (action?: () => void | Promise<void>) => {
        if (!action) {
            handleClose();
            return;
        }

        const result = action();
        if (result instanceof Promise) {
            setLoading(true);
            await result;
            setLoading(false);
        }

        handleClose();
    };

    const handleClose = () => {
        if (loading) return;
        setClosing(true);
        setTimeout(() => {
            onClose?.();
        }, 200);
    };

    const handleFormSubmit = async () => {
        if (!onConfirm) return handleClose();
        if (typeof onConfirm === 'function') {
            setLoading(true);
            const result = (onConfirm as FormHandler)(formState);
            if (result instanceof Promise) await result;
            setLoading(false);
        }
        handleClose();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resolvedTitleColor =
        (titleType && titleColorMap[titleType]) || (titleType?.startsWith('#') ? titleType : undefined);

    return (
        <div className="modal-backdrop" onClick={() => !loading && handleClose()}>
            <div className={`modal ${closing ? 'modal-closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                {(title || icon || iconType) && (
                    <div className="modal-header" style={{ color: resolvedTitleColor }}>
                        {icon
                            ? icon
                            : iconType && <FontAwesomeIcon icon={iconMap[iconType]} style={{ marginRight: '0.5rem' }} />}
                        {title}
                    </div>
                )}

                <div className="modal-body">
                    {type === 'form-input' && fields ? (
                        <form>
                            {fields.map((field) => (
                                <div className="modal-form-field" key={field.name}>
                                    {field.label && <label htmlFor={field.name}>{field.label}</label>}
                                    <br />
                                    {field.type === 'dropdown' && field.values ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={formState[field.name] || ''}
                                            onChange={handleChange}
                                            disabled={loading}
                                        >
                                            <option value="">-- Vælg --</option>
                                            {field.values.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === 'radio' && field.values ? (
                                        field.values.map((option) => (
                                            <label key={option} className="custom-control">
                                                <input
                                                    type="radio"
                                                    name={field.name}
                                                    value={option}
                                                    checked={formState[field.name] === option}
                                                    onChange={handleChange}
                                                    disabled={loading}
                                                />
                                                {option}
                                            </label>
                                        ))
                                    ) : (
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={formState[field.name] || ''}
                                            onChange={handleChange}
                                            disabled={loading}
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                    ) : (
                        body
                    )}
                </div>

                <div className="modal-footer">
                    {type === 'alert' && (
                        <button onClick={() => handleClose()} disabled={loading}>
                            {confirmText}
                        </button>
                    )}

                    {type === 'confirmation' && (
                        <>
                            <button onClick={() => handleClose()} disabled={loading}>
                                Annuller
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => handleAction(onConfirm as BasicHandler)}
                                disabled={loading}
                            >
                                {confirmText}
                            </button>
                        </>
                    )}

                    {type === 'multi-option' &&
                        options?.map((opt) => (
                            <button
                                key={opt.name}
                                className={`btn ${opt.type ? `btn-${opt.type}` : ''}`}
                                onClick={() => handleAction(opt.onChosen)}
                                disabled={loading}
                            >
                                {opt.name}
                            </button>
                        ))}

                    {type === 'form-input' && (
                        <>
                            <button onClick={() => handleClose()} disabled={loading}>
                                Annuller
                            </button>
                            <button
                                className="btn-primary"
                                onClick={handleFormSubmit}
                                disabled={loading}
                            >
                                Gem
                            </button>
                        </>
                    )}

                    {type === 'custom' &&
                        customOptions?.map((opt) => (
                            <button
                                key={opt.name}
                                className={`btn ${opt.type ? `btn-${opt.type}` : ''}`}
                                onClick={() => handleAction(opt.onClick)}
                                disabled={loading}
                            >
                                {opt.name}
                            </button>
                        ))}
                </div>
                {loading && <div className="modal-loading">Vent venligst...</div>}
            </div>
        </div>
    );
};

export default ModalRenderer;
