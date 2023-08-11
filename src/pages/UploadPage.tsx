import React, { useState } from "react";
import { styled } from "styled-components";
import ImageUpload from "../components/UploadPage/ImageUpload";
import TitleUpload from "../components/UploadPage/TitleUpload";
import CategoryUpload from "../components/UploadPage/CategoryUpload";
import RegionUpload from "../components/UploadPage/RegionUpload";
import ConditionUpload from "../components/UploadPage/ConditionUpload";
import MethodUpload from "../components/UploadPage/MethodUpload";
import DetailUpload from "../components/UploadPage/DetailUpload";
import TagUpload from "../components/UploadPage/TagUpload";
import WantedUpload from "../components/UploadPage/WantedUpload";
import { StBasicButton } from '../styles/BasicButton';
import { postUploadApi } from "../api/goods";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {

  const navigate = useNavigate();

  type uploadBodyData = {
    data: {
      title: string,
      content: string,
      tradeType: string,
      category: string,
      goodsCondition: string,
      location: string
    },
    wanted: {
      title: string,
      content: string,
      category: string
    }
  };

  const [uploadImages, setUploadImages] = useState<{images: string[]}>({
    images: []
  });
  const [uploadPrice, setUploadPrice] = useState<{sellerPrice: {sellerPrice: string}}>({
    sellerPrice: {
      sellerPrice: ""
    }
  });
  const [uploadData, setUploadData] = useState<uploadBodyData>({
    data: {
      title: "",
      content: "",
      tradeType: "",
      category: "",
      goodsCondition: "",
      location: "경기도 00시 00구 00동",
    },
    wanted: {
      title: "",
      content: "",
      category: "",
    }
  });

  const onClickUploadHandler = async () => {
    const formData = new FormData();
    uploadImages.images.forEach(images => formData.append("images", images));
    formData.append("data", new Blob([JSON.stringify(uploadData.data)], { type: "application/json" }));
    formData.append("wanted", new Blob([JSON.stringify(uploadData.wanted)], { type: "application/json" }));
    formData.append("sellerPrice", new Blob([JSON.stringify(uploadPrice.sellerPrice)], { type: "application/json" }));
    try {
      const response = await postUploadApi(formData);
      if (response.status === 200) {
        alert("업로드 성공!");
        navigate('/');
      };
    } catch (error) {
      console.log(error);
    };
      //     // JSON 데이터
      // const jsonData = {
      //   data: {
      //     title: "노트북1",
      //     content: "content",
      //     tradeType: "직거래",
      //     category: "DIGITAL",
      //     goodsCondition: "상",
      //     location: "test"
      //   },
      //   wanted: {
      //     title: "원하는 물품",
      //     content: "내용",
      //     category: "digital"
      //   }
      // };

      // // FormData 생성
      // const formData = new FormData();

      // // 이미지 파일 추가
      // formData.append("images", imageFile);

      // // JSON 데이터를 문자열로 변환하여 FormData에 추가
      // formData.append("data", new Blob([JSON.stringify(jsonData.data)], { type: "application/json" }));
      // formData.append("wanted", new Blob([JSON.stringify(jsonData.wanted)], { type: "application/json" }));

      // // 요청 보내기
      // axios.post(url, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data" // Content-Type 설정
      //   }
      // })
      // .then(response => {
      //   console.log("응답 받음:", response.data);
      // })
      // .catch(error => {
      //   console.error("에러 발생:", error);
      // });
    console.log("uploadImages", uploadImages);
    console.log("uploadData", uploadData);
    console.log("uploadPrice", uploadPrice);
  };

  return (
    <PageLayout>
      <PageHeader>ADD TO MY POCKET</PageHeader>
      <TitleWrapper>
        <PageTitle>내 주머니에 추가</PageTitle>
        <PageSubtitle>* 필수항목</PageSubtitle>
      </TitleWrapper>
      <PageContainer>
        <ImageUpload setUploadImages={setUploadImages} uploadImages={uploadImages} />
        <TitleUpload setUploadData={setUploadData} uploadData={uploadData} />
        <CategoryUpload setUploadData={setUploadData} uploadData={uploadData} />
        <RegionUpload setUploadData={setUploadData} uploadData={uploadData} />
        <ConditionUpload setUploadData={setUploadData} uploadData={uploadData} setUploadPrice={setUploadPrice} uploadPrice={uploadPrice} />
        <MethodUpload setUploadData={setUploadData} uploadData={uploadData} />
        <DetailUpload setUploadData={setUploadData} uploadData={uploadData} />
        <TagUpload />
        <WantedUpload setUploadData={setUploadData} uploadData={uploadData} />
        <BtnWrapper>
          <StBasicButton buttonColor="#D9D9D9" onClick={onClickUploadHandler}>주머니에 추가</StBasicButton>
        </BtnWrapper>
      </PageContainer>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const PageHeader = styled.div`
  font-family: "Lemon/Milk", sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 110%;
`;

const PageContainer = styled.div`
  border-top: 4px solid;
  width: 100%;

  @media screen and (max-width: 1136px) {
        padding: 0px 20px 0px 20px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  margin: 16px 0px 20px 0px;
`;

const PageTitle = styled.div`
  font-family: "Pretendard";
  font-size: 32px;
  font-weight: 800;
  line-height: 150%;
  margin: 0px 20px 0px 0px;
`;

const PageSubtitle = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  padding: 17px 0px 0px 0px;
`;

const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0px 0px 0px;
`;

export default UploadPage;
