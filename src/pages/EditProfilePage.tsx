import React, { useState } from "react";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import { StBasicButton } from "../styles/BasicButton";
import { useNavigate } from "react-router-dom";
import { StBasicInput } from "../styles/BasicInput";
import ProfileImageUpload from "../components/EditProfilePage/ProfileImageUpload";

interface EditForm {
  select: string;
  password: string;
  newpassword: string;
  confirmPassword: string;
  nickname: string;
  address: string;
}

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(""); //주소
  const [openPostcode, setOpenPostcode] = React.useState<boolean>(false);

  const addressOnchange = (data: any) => {
    setAddress(data);
    console.log(data);
  };

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<EditForm>({ mode: "onBlur" });
  return (
    <div>
      <EditProfilePageContainer>
        <TitleContainer>
          <Title>
            MY ACCOUNT
            <SubTitle>개인정보 수정</SubTitle>
          </Title>
        </TitleContainer>
        <EditProfileForm
        // onSubmit={handleSubmit(async (data) => {
        //   const newForm = {
        //     email: `${data.email}${data.select}`,
        //     password: data.password,
        //     nickname: data.nickname,
        //   };
        //   try {
        //     const res = await patchEditProfileApi(newForm);
        //     if(res.status === 201) {
        //       console.log("개인정보수정완료", res);
        //       navigate("/login")
        //     }
        //   } catch(error){
        //     console.log(error);
        //     alert(JSON.stringify(error.response.data.data))
        //   }
        // })}
        >
          <ProfileImageContainer>
            <ProfileImageUpload />
          </ProfileImageContainer>
          <EmailContainer>
            <Label>이메일(아이디)</Label>
            <Email>peeppo@gmail.com</Email>
          </EmailContainer>
          <NickNameContainer>
            <CommonLabel>닉네임</CommonLabel>
            <NickNameInputContainer>
              <StBasicInput
                type="text"
                placeholder="닉네임을 입력해주세요."
                {...register("nickname", {})}
              />
            </NickNameInputContainer>
          </NickNameContainer>
          <Content>* 이미 사용중인 이메일입니다.</Content>
          <PwContainer>
            <Label>현재 비밀번호</Label>
            <PwInputContainer>
              <StBasicInput
                type="password"
                placeholder="현재 비밀번호를 입력해주세요."
                {...register("password", {})}
              />
            </PwInputContainer>
          </PwContainer>
          <Content>* 비밀번호가 일치하지 않습니다.</Content>
          <CheckPwContainer>
            <Label>비밀번호 재설정</Label>
            <SetPwInputContainer>
              <NewInputContainer>
                <StBasicInput
                  type="password"
                  placeholder="새 비밀번호를 입력해주세요."
                  {...register("newpassword", {
                    required: "필수입력 항목입니다.",
                    minLength: {
                      value: 8,
                      message:
                        "영문, 숫자, 특수문자 각 1개 이상을 포함한 8자리 이상",
                    },
                    pattern: {
                      value:
                        /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"/,
                      message:
                        "영문, 숫자, 특수문자 각 1개 이상을 포함한 8자리 이상의 비밀번호를 작성해주세요.",
                    },
                  })}
                />
                <PwValidation>
                  * 영문, 숫자, 특수문자 각 1개 이상을 포함한 8자리 이상의
                  비밀번호를 작성해주세요.
                </PwValidation>
              </NewInputContainer>

              <CheckPwInputContainer>
                <StBasicInput
                  type="password"
                  placeholder="비밀번호를 확인해주세요."
                  {...register("confirmPassword", {
                    required: "필수입력 항목입니다.",
                    validate: {
                      check: (value) => {
                        if (getValues("password") !== value) {
                          return "비밀번호가 일치하지 않습니다.";
                        }
                      },
                    },
                  })}
                />
                <PwValidation>* 비밀번호가 일치하지 않습니다.</PwValidation>
              </CheckPwInputContainer>
            </SetPwInputContainer>
          </CheckPwContainer>
          <AddressLabelContainer>
            <AddressLabel>주거래지역</AddressLabel>
            <CurrentAddress>서울시 강남구</CurrentAddress>
          </AddressLabelContainer>
          <AddressContainer>
            <StBasicInput
              type="text"
              placeholder="수정할 주소를 입력해주세요."
              value={address}
              onChange={addressOnchange}
            />
            <StBasicButton
              buttonColor="#D9D9D9;"
              style={{ marginLeft: "20px" }}
              onClick={handle.clickButton}
            >
              {openPostcode && (
                <DaumPostcode
                  onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
                />
              )}
              주소찾기
            </StBasicButton>
          </AddressContainer>
          <AddContent>
            입력된 주소는 나의 주거래 지역으로 표시됩니다.
          </AddContent>
        </EditProfileForm>
        <AssignButtonContainer>
          <StBasicButton
            buttonColor="#D9D9D9;"
            onClick={() => {
              navigate("/login");
            }}
          >
            변경사항 저장
          </StBasicButton>
        </AssignButtonContainer>
      </EditProfilePageContainer>
    </div>
  );
};

const EditProfilePageContainer = styled.div`
  /* border: 1px solid blue; */
`;
const TitleContainer = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin: auto;
  margin-top: 80px;
`;
const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  /* margin-bottom: 30px; */
`;
const SubTitle = styled.div`
  font-size: 32px;
  margin-top: 16px;
  margin-bottom: 16px;
`;
const EditProfileForm = styled.form`
  /* border: 1px solid black; */
  border-top: 5px solid black;
  border-bottom: 5px solid black;
  width: 100%;
  height: 1135px;
  margin: auto;
`;
const ProfileImageContainer = styled.div`
  /* border: 3px solid green; */
`;
const EmailContainer = styled.div`
  /* border: 3px solid green; */
  display: flex;
  align-items: center;
  margin-top: 44px;
  margin-bottom: 44px;
`;
const Label = styled.div`
  /* border: 1px solid red; */
  font-size: 20px;
  width: 150px;
  font-weight: 700;
  display: flex;
  margin-right: 70px;
`;
const Email = styled.div`
  /* border: 1px solid red; */
`;

const NickNameContainer = styled.div`
  /* border: 3px solid green; */
  border-top: 1px solid gray;
  padding-top: 30px;
  display: flex;
  align-items: center;
`;
const CommonLabel = styled.div`
  font-size: 20px;
  width: 150px;
  font-weight: 700;
  /* border: 1px solid red; */
  margin-right: 70px;
`;
const NickNameInputContainer = styled.div`
  width: 656px;
`;
const Content = styled.div`
  /* border: 1px solid blue; */
  width: 465px;
  height: 24px;
  margin-left: 220px;
  color: red;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const PwContainer = styled.div`
  /* border: 3px solid green; */
  border-top: 1px solid gray;
  display: flex;
  align-items: center;
  padding-top: 30px;
  margin-top: 30px;
  /* margin-bottom: 30px; */
`;
const PwInputContainer = styled.div`
  /* border: 1px solid red; */
  width: 656px;
`;
const SetPwInputContainer = styled.div`
  /* border: 1px solid red; */
  width: 656px;
`;
const NewInputContainer = styled.div`
  /* border: 1px solid green; */
`;
const CheckPwInputContainer = styled.div`
  /* border: 1px solid green; */
`;
const CheckPwContainer = styled.div`
  /* border: 3px solid green; */
  border-bottom: 1px solid gray;
  display: flex;

  /* align-items: center; */
  /* margin-bottom: 30px; */
`;
const PwValidation = styled.div`
  color: red;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 16px;
`;
const CurrentAddress = styled.div`
  /* border: 1px solid red; */

  font-size: 16px;
`;
const AddressLabelContainer = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const AddressLabel = styled.label`
  /* border: 1px solid red; */
  width: 150px;
  height: 33px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 70px;
`;
const AddressContainer = styled.div`
  /* border: 3px solid green; */
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding-left: 220px;
  padding-right: 250px;
`;
const AddContent = styled.div`
  /* border: 1px solid red; */
  margin: 10px 0px 40px 220px;
  color: gray;
`;

const AssignButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* border: 1px solid red; */
  padding: 20px 0px 20px 0px;
`;

export default EditProfilePage;
