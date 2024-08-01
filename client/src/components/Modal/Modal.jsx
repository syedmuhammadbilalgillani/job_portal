import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal = forwardRef(({ isOpen, onClose, children }, ref) => {
  const modalRef = useRef(null);

  // Expose a close method through the ref
  useImperativeHandle(ref, () => ({
    closeModal() {
      onClose();
    },
  }));

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      nodeRef={modalRef}
    >
      <div
        ref={modalRef}
        className="fixed inset-0.5  flex items-center justify-center z-[99]"
      >
        <div className="modal-bg" onClick={onClose} />
        <div className="modal-content-wrapper">
          <div className="modal-content">
            <div className="modal-scrollable-content">{children}</div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});

export default Modal;
