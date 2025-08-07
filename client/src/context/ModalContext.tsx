import React, { createContext, useContext, useState, ReactNode } from 'react';
import ModalRenderer, { ModalProps } from '../components/ModalRenderer';

export interface ModalContextType {
  showModal: (modal: ModalProps) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const hideModal = () => setModalProps(null);

  const showModal = (modal: ModalProps) => {
    setModalProps({
      ...modal,
      onClose: hideModal,
    });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalProps && <ModalRenderer {...modalProps} />}
    </ModalContext.Provider>
  );
};