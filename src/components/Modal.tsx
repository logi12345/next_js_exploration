import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import cross from "../svg/Cross.svg";

interface StyledProps {
  dimensions: { width: number; height: number };
  zIndex?: number;
}
interface OverlayProps {
  overlayDimensions?: { width: number; height: number };
}

interface CompProps {
  displayModal: (e: any) => void;
}

interface ModalChildren extends CompProps, StyledProps, OverlayProps {
  children: ReactNode;
}

/**
 *
 * Reusable and resizable modal that can nest any other JSX component
 *
 * @param dimnsions the height and width of the modal
 * @param children the jsx components to nest int the modal
 * @param displayModal callback used to set whether to show modal or not
 * @param zIndex used to assign hierarchy for what layer to show modal
 * @returns `Modal` Component
 */
const Modal: React.FC<ModalChildren> = ({
  dimensions,
  children,
  displayModal,
  zIndex,
}) => {
  return (
    <ModalOverlay
      data-testid="modal-overlay"
      className="ModalOverlay"
      onClick={(e: any) => {
        if (e.target.classList.contains("ModalOverlay")) {
          displayModal(e);
        }
      }}
    >
      <ModalContainer zIndex={zIndex} dimensions={dimensions}>
        <ModalInnerContainer>
          <ModalHeader>
            {/* <img
              data-testid="modal"
              src={cross}
              alt="cross"
              style={{ padding: "25px", width: 16, height: 16 }}
              onClick={displayModal}
            /> */}
          </ModalHeader>

          {children}
        </ModalInnerContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;

const fadeInAnimation = keyframes`
  0%{opacity:0}
  100%{opacity:0.8}
`;

const dropInAnimation = keyframes`
  0%{transform:translateX(-900px)}
  100%{transform:translateX(0px)}
`;

const ModalOverlay = styled.div`
  position: fixed;
  /* background-color: rgba(125, 125, 125, 0.8); */
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  animation-name: ${fadeInAnimation};
  animation-duration: 0.2s;
`;

const ModalContainer = styled.div<StyledProps>`
  position: absolute;
  /* height: ${({ dimensions }) => dimensions.height * 0.8 + "px"};
  width: ${({ dimensions }) => dimensions.width * 0.8 + "px"}; */
  margin-top: ${({ dimensions }) => -(dimensions.height * 0.8) * 0.5 + "px"};
  margin-left: ${({ dimensions }) => -(dimensions.width * 0.8) * 0.6 + "px"};
  /* background-color: white; */
  /* border: 4px solid black; */
  border-radius: 50px;
  left: 50%;
  top: 50%;
  z-index: ${({ zIndex }) => zIndex};
  animation-name: ${dropInAnimation};
  animation-duration: 0.5s;
`;

const ModalInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20%;
`;
