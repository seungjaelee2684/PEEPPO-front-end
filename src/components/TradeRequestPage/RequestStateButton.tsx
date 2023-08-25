import React, { useState } from "react";
import { styled } from "styled-components";
import { StBasicButton } from "../../styles/BasicButton";
import eye from "../../assets/icon/openeye.png";
import chat from "../../assets/icon/Chatting.png";
import { useNavigate } from "react-router-dom";
import RequestRejectModal from "./RequestRejectModal";
import TradeCompleteModal from "./TradeCompleteModal";
import TradeDeleteModal from "./TradeDeleteModal";

interface RequestStateButtonProps {
  requestState: { request: string };
  setRequestState: React.Dispatch<React.SetStateAction<{ request: string }>>;
}

const RequestStateButton: React.FC<RequestStateButtonProps> = ({
  requestState,
  setRequestState,
}) => {
  const navigate = useNavigate();
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { request } = requestState;

  const rejectModalClick = () => {
    setRejectModalOpen(!rejectModalOpen);
  };

  const requestAcceptOnclick = () => {
    setRequestState({ ...requestState, request: "교환진행중" });
  };

  const completeModalClick = () => {
    setCompleteModalOpen(!completeModalOpen);
    // setRequestState({ ...requestState, request: "교환완료" });
  };

  const deleteModalClick = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const stateButton = () => {
    if (request === "교환요청") {
      return (
        // <WaitingStateContainer>
        //   <Img src={eye} />
        //   상대방의 응답 기다리는 중...
        // </WaitingStateContainer>
        <RequestBtContainer>
          <StAssureBt buttonColor="#FFCA64" onClick={requestAcceptOnclick}>
            수락
          </StAssureBt>
          <StRejectBt buttonColor="white" onClick={rejectModalClick}>
            거절
          </StRejectBt>
          {rejectModalOpen && (
            <RequestRejectModal
              requestState={requestState}
              setRequestState={setRequestState}
              rejectModalOpen={rejectModalOpen}
              setRejectModalOpen={setRejectModalOpen}
            />
          )}
        </RequestBtContainer>
      );
    }
    if (request === "교환진행중") {
      return (
        <ButtonContainer>
          <StCompleteBt buttonColor="#F9B482" onClick={completeModalClick}>
            완료
          </StCompleteBt>
          {completeModalOpen && (
            <TradeCompleteModal
              completeModalOpen={completeModalOpen}
              setCompleteModalOpen={setCompleteModalOpen}
              requestState={requestState}
              setRequestState={setRequestState}
            />
          )}
          <StChatBt
            buttonColor="white"
            onClick={() => {
              navigate("/chat");
            }}
          >
            채팅하기
            <Img src={chat} />
          </StChatBt>
        </ButtonContainer>
      );
    }

    if (request === "교환완료") {
      return (
        <div>
          <StDetailBt buttonColor="white">자세히보기</StDetailBt>
        </div>
      );
    }

    // if (request === "교환취소") {
    //   return (
    //     <div>
    //       <StDeleteBt buttonColor="white" onClick={deleteModalClick}>
    //         기록 삭제
    //       </StDeleteBt>
    //       {deleteModalOpen && (
    //         <TradeDeleteModal
    //           deleteModalOpen={deleteModalOpen}
    //           setDeleteModalOpen={setDeleteModalOpen}
    //           requestState={requestState}
    //           setRequestState={setRequestState}
    //         />
    //       )}
    //     </div>
    //   );
    // }
  };
  return <div>{stateButton()}</div>;
};
const RequestBtContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const WaitingStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
  font-size: 14px;
  font-weight: 400;
`;

export const Img = styled.img`
  width: 24px;
  height: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 136px;
`;
export const StCompleteBt = styled(StBasicButton)`
  width: 80px;
  height: 44px;
  border: 1px solid black;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;

export const StChatBt = styled(StBasicButton)`
  width: 112px;
  height: 44px;
  border: 1px solid #d5d4d4;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;

const StDetailBt = styled(StBasicButton)`
  width: 176px;
  border: 1px solid #d5d4d4;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
`;

const StDeleteBt = styled(StBasicButton)`
  width: 176px;
  border: 1px solid #d5d4d4;
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
  margin-top: 70px;
`;
const StAssureBt = styled(StBasicButton)`
  width: 80px;
  height: 44px;
  border-radius: 5px;
  border: 1px solid black;
`;

const StRejectBt = styled(StBasicButton)`
  width: 80px;
  height: 44px;
  border-radius: 5px;
  border: 1px solid #adadad;
`;
export default RequestStateButton;
