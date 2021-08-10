import React from 'react';
import { createModal } from "react-modal-promise";
import {ErrorModal} from "./components/ErrorModal";
import {UnauthorizedModal} from "./components/UnauthorizedModal";
import {GameBetModal} from "./components/GameBetModal";
import { InfoModal } from './components/InfoModal';

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
        {type === 'error' ?
          <ErrorModal
            message={message}
            onClose={handleClose}
          /> : null
        }
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
      </div>
    )
}

export const showModal: any = createModal(ModalSystem)