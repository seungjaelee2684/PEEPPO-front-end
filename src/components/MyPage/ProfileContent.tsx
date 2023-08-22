import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import Pocket from './Pocket';
import Setting from '../../assets/icon/setting.png'
import { useNavigate } from 'react-router';
import MyChat from '../../assets/icon/profile.png'

const ProfileContent = ({ data } : any) => {

    const navigate = useNavigate();
    
    return (
        <LeftContainer>
            <LeftContentContainer>
                <ImageContainer src={(data.data.info.image === null) ? MyChat : data.data.info.image}/>
                <ContentInBox>
                    <ContentLine>
                        <TypeContainer>이메일(아이디)</TypeContainer>
                        <TextContainer>{data.data.info.email}</TextContainer>
                    </ContentLine>
                    <ContentLine>
                        <TypeContainer>닉네임</TypeContainer>
                        <TextContainer>{data.data.info.nickname}</TextContainer>
                    </ContentLine>
                    <ContentLine>
                        <TypeContainer>주거래지역</TypeContainer>
                        <TextContainer>{data.data.info.location}</TextContainer>
                    </ContentLine>
                </ContentInBox>
                <ButtonBox>
                    <Button src={Setting} onClick={() => navigate('/editprofile')} />
                </ButtonBox>
            </LeftContentContainer>
            <Pocket />
        </LeftContainer>
    )
};

const LeftContainer = styled.div`
    width: 944px;
    height: 204px;

    @media screen and (max-width: 1136px) {
        width: 100%;
    }
`;

const TitleContainer = styled.div`
    width: 100%;
    font-family: "Lemon/Milk", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
    padding: 0px 0px 10px 0px;
`;

const LeftContentContainer = styled.div`
    display: flex;
    height: 204px;
    align-items: center;
    padding: 30px 20px 30px 40px;
    border: 1px solid #D5D4D4;
    position: relative;
    background-color: #FCFCFC;
`;

const ImageContainer = styled.div<{ src: string }>`
    min-width: 113px;
    height: 113px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-size: cover;
    background-image: ${(props) => `url(${props.src})`};
`;

const ContentInBox = styled.div`
    display: grid;
    gap: 16px;
    padding: 0px 0px 0px 40px;
    width: 80%;
`;

const ContentLine = styled.div`
    display: flex;
    align-items: center;
`;

const TypeContainer = styled.div`
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    width: 192px;

    @media screen and (max-width: 1144px) {
        width: 150px;
    }
`;

const TextContainer = styled.div`
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
`;

const ButtonBox = styled.div`
    top: 20px;
    right: 20px;
    position: absolute;
`;

const Button = styled.img`
    width: 24px;
    height: 24px;
    color: #000;
    object-fit: contain;
    cursor: pointer;
`;

export default ProfileContent;