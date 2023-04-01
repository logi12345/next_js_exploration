import useDimensions from "@/hooks/utils";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";
import Modal from "./Modal";

// import ErrorHandler from '../ErrorHandler';

interface StyledProps {
  overFlowScrollY?: boolean;
}

interface Props extends StyledProps {
  showModal: boolean;
  setShowModal: (e: any) => void;
}

/**
 * Modal containing table to use to create graph
 * @param showModal boolean variable for displaying modal
 * @param setShowModal callback fors setting whether to show modal or not
 * @returns `GraphTableModal` Component
 */
const ColourModal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const { height, width } = useDimensions();

  return (
    <>
      {showModal && (
        <Modal
          displayModal={(e: any) => setShowModal((prev: boolean) => !prev)}
          dimensions={{ height, width }}
          zIndex={3}
        >
          <Main overFlowScrollY={true}>
            <SketchPicker />
          </Main>
          <Footer></Footer>
        </Modal>
      )}
    </>
  );
};

export default ColourModal;

const Main = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  overflow-y: ${(props) => (props.overFlowScrollY ? "scroll" : "hidden")};
  height: 80%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20%;
`;
