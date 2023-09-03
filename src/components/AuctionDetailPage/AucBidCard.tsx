import React, { useEffect } from 'react'
import { styled } from 'styled-components';
import Location from '../../assets/icon/location.png'
import Check from '../../assets/icon/check.png'

const AucBidCard = ({ item, setCheckBox, checkBox, choice, seller, setBidSellerPick, bidSellerPick } : any) => {

    const index = checkBox?.indexOf(item?.bidId);

    const onClickCheckHandler = (item : any) => {
        if (seller) {
            if (index !== -1) {
                setCheckBox(checkBox.filter((value : number) => value !== item?.bidId));
            } else {
                setCheckBox([...checkBox, item?.bidId]);
            };
        } else {
            if (checkBox === item?.bidId) {
                setCheckBox([]);
            } else {
                setCheckBox(item?.bidId);
            };     
        };
    };

    useEffect(() => {
        if (choice) {
            if (checkBox) {
                if (seller) {
    
                } else {
                    setBidSellerPick({...bidSellerPick, bidId: checkBox});
                };
            };
        };
    }, [checkBox]);
    console.log("선택", checkBox);
    

    const cardCondition = () => {
        if (choice) {
            return (
                <CardContainer onClick={() => onClickCheckHandler(item)}>
                    <CardImg src={item?.image}>
                        {(seller)
                            ? (index !== -1)
                                && <div>
                                    <CheckOutContainer />
                                    <CheckContainer>
                                        <CheckBox>
                                            <CheckImage src={Check} />
                                        </CheckBox>
                                    </CheckContainer>
                                </div>
                            : (checkBox === item?.bidId)
                                && <div>
                                    <CheckOutContainer />
                                    <CheckContainer>
                                        <CheckBox>
                                            <CheckImage src={Check} />
                                        </CheckBox>
                                    </CheckContainer>
                                </div>}
                    </CardImg>
                    <TitleContainer>{item?.title}</TitleContainer>
                    <ContentContainer>{item?.location}</ContentContainer>
                </CardContainer>
            );
        } else {
            return (
                <CardContainer>
                <CardImg src={item?.image}>
                    {(item?.sellersPick) && <SellerChoice>SELLER'S PICK</SellerChoice>}
                </CardImg>
                <TitleContainer>{item?.title}</TitleContainer>
                <ContentContainer>{item?.location}</ContentContainer>
            </CardContainer>
            );
        };
    };

    return (
        <div>{cardCondition()}</div>
    )
};

const CardContainer = styled.div`
        width: 272px;
        height: 333px;
        cursor: pointer;
    `;

const CardImg = styled.div<{ src : string }>`
        width: 272px;
        height: 272px;
        border-radius: 10px;
        background-image: ${(props) => `url(${props.src})`};
        background-size: cover;
        position: relative;
    `;

const CardLocationContainer = styled.div`
        width: 100%;
        height: 44px;
        border-radius: 10px 10px 0px 0px;
        color: #fff;
        background-color: #222020;
        opacity: 0.2;
        display: flex;
        align-items: center;
        position: absolute;
    `;

const LocatinoWrapper = styled.div`
        display: flex;
        align-items: center;
        gap: 4px;
        top: 10px;
        left: 20px;
        position: absolute;
        z-index: 20;
    `;

const LocationText = styled.div`
        color: #fff;
        font-family: "Pretendard";
        font-size: 16px;
        font-weight: 400;
        line-height: 150%;
    `;

const LocationIcon = styled.img`
        width: 18px;
        height: 18px;
    `;

const TitleContainer = styled.div`
        width: 100%;
        font-family: "Pretendard";
        font-size: 20px;
        font-weight: 700;
        line-height: 150%;
        padding: 10px 0px 0px 0px;
    `;

const ContentContainer = styled.div`
        font-family: "Pretendard";
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        color: #ADADAD;
    `;

const SellerChoice = styled.div`
    background-color: #58ABF7;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    font-family: "Lemon/Milk", sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
    color: #FCFCFC;
    bottom: 0;
    position: absolute;
    border-radius: 0px 0px 10px 10px;
`;

const CheckOutContainer = styled.div`
    width: 272px;
    height: 272px;
    border-radius: 10px;
    background-color: #000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1005;
`;

const CheckContainer = styled.div`
    width: 272px;
    height: 272px;
    border-radius: 10px;
    border: 6px solid #222020;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const CheckBox = styled.div`
    width: 98px;
    height: 98px;
    border-radius: 100%;
    border: 5px solid #222020;
    background-color: #FCFCFC;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CheckImage = styled.img`
    width: 48px;
    height: 48px;
`;

export default AucBidCard;