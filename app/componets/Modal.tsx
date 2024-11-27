import { ReactNode } from "react";
import styles from '~/styles/modal.css'

type ModalProps = {
children : ReactNode,
onClose : () => void;
}


function Modal({ children, onClose }: ModalProps) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <dialog
          className="modal"
          open
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </dialog>
      </div>
    );
  }
  
  export default Modal;


  export function links(){
    return [{rel: 'stylesheet', href:styles}]
  }