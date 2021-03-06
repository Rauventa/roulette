import React, { useEffect } from 'react';
import { createModal } from "react-modal-promise";
import {UnauthorizedModal} from "./components/UnauthorizedModal";
import {GameBetModal} from "./components/GameBetModal";
import { InfoModal } from './components/InfoModal';
import {RouletteBetModal} from "./components/RouletteBetModal/RouletteBetModal";
import {AuthModal} from "./components/AuthModal/AuthModal";

interface ModalSystemProps {
  type: string,
  message?: string,
  formState?: any,
  onResolve: (data?: any) => void,
  onReject: () => void
}

const ModalSystem: any = ({
  type,
  message,
  formState,
  onResolve,
  onReject
}: ModalSystemProps) => {

  //Disable body overflow when modal is open

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

    const handleClose = (value: boolean) => {

      let status = false

      if (value) {
        status = true
      }

      onResolve({status})
    }

    if (!type) {
      return null
    }

    return (
      <div>
        {type === 'info' ?
          <InfoModal
            message={message}
            formState={formState}
            onClose={handleClose}
          /> : null
        }
        {type === 'unauthorized' ?
          <UnauthorizedModal
            message={message}
            onClose={handleClose}
          /> : null
        }
        {type === 'dice-game' || type === 'hilo-game' ?
          <GameBetModal
            type={type}
            formState={formState}
            onClose={handleClose}
          /> : null
        }
        {type === 'roulette' ?
            <RouletteBetModal
                formState={formState}
                onClose={handleClose}
            /> : null
        }
        {type === 'auth' ?
          <AuthModal
            formState={formState}
            onClose={handleClose}
          /> : null
        }
      </div>
    )
}

export const showModal: any = createModal(ModalSystem)