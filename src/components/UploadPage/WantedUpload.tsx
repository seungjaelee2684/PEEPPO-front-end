import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import CategorySelect from '../common/CategorySelect';

const WantedUpload = ({ uploadData, setUploadData } : any) => {

    const  [categorySelect, setCategorySelect] = useState({
        category: "",
        name: "카테고리 선택",
    });
    const [selectBar, setSelectBar] = useState<boolean>(false);
    const [info, setInfo] = useState({
        title: "",
        content: ""
    });
    const { category, name } = categorySelect;
    const { title, content } = info;

    const onClickDropDownHandelr = () => {
        setSelectBar(!selectBar);
    };

    const onChangeTextInfoHandler = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const onBlurEventHandler = () => {
        setUploadData({...uploadData, wanted: {...uploadData.wanted, title: title, content: content}});
    };

    useEffect(() => {
        if (category !== "") {
            setUploadData({...uploadData, wanted: {...uploadData.wanted, category: category}});
        };
    }, [selectBar]);

  return (
    <LastLineContainer>
        <RequiredText>받아요</RequiredText>
        <LastWrapper>
            <SelecBarWrapper>
                <SelectBar style={{marginBottom: "30px"}}>
                    <Text>{name}</Text>
                    <ChoiceBox onClick={onClickDropDownHandelr}></ChoiceBox>
                </SelectBar>
            </SelecBarWrapper>
            {(selectBar)
                && <SelectContainer>
                    <CategorySelect
                        categorySelect={categorySelect}
                        setCategorySelect={setCategorySelect}
                        setSelectBar={setSelectBar}
                    />
                </SelectContainer>
            }
            <TitleInput
                    type='text'
                    maxLength={40}
                    name='title'
                    value={title}
                    placeholder='제목을 입력해주세요.'
                    onChange={onChangeTextInfoHandler}
                    onBlur={onBlurEventHandler}
                >
            </TitleInput>
            <InputContainer>
                <DesciptionTextarea
                    typeof='text'
                    maxLength={2000}
                    name='content'
                    value={content}
                    placeholder='구입 연도, 브랜드, 사용감, 하자 유무 등 교환을 원하는 사람들에게 필요한 정보를 꼭 포함해주세요! (최소 10자 이상)'
                    onChange={onChangeTextInfoHandler}
                    onBlur={onBlurEventHandler}
                />
            </InputContainer>
            <TextCount
                style={{marginBottom: "30px"}}
                color={(content.length >= 2000) ? "red" : "#000"}
            >{content.length}/2000
            </TextCount>
            <TagInput
                placeholder='태그를 입력해주세요.'
            />
        </LastWrapper>
    </LastLineContainer>
  )
};

const LastLineContainer = styled.div`
    display: flex;
    padding: 30px 0px 60px 0px;
    border-bottom: 4px solid;
`;

const RequiredText = styled.div`
    font-family: "Pretendard";
    font-size: 20px;
    font-weight: 700;
    line-height: 150%;
    min-width: 191px;
`;

const SelecBarWrapper = styled.div`
    width: 100%;
`;

const SelectBar = styled.div`
    display: inline-flex;
    height: 44px;
    padding: 0px 20px;
    border-bottom: 1px solid;
    justify-content: center;
    align-items: center;
    gap: 122px;
    margin-bottom: 30px;

    @media screen and (max-width: 843px) {
        gap: 20px;
    }
`;

const LastWrapper = styled.div`
    width: 100%;
    display: grid;
`;

const Text = styled.div`
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
`;

const ChoiceBox = styled.div`
    width: 24px;
    height: 24px;
    background-color: #D9D9D9;
    cursor: pointer;
`;

const InputContainer = styled.div`
    width: 100%;
    height: 199px;
    border: 1px solid;
    padding: 20px;
`;

const DesciptionTextarea = styled.textarea`
    width: 100%;
    height: 100%;
    font-family: "Pretendard";
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    border: none;
    outline: none;
`;

const TextCount = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin: 10px 0px 0px 0px;
    margin-bottom: 30px;
`;

const TagInput = styled.input`
    display: inline-flex;
    width: 100%;
    height: 44px;
    padding: 0px 0px 0px 20px;
    margin: 0px 0px 15px 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid;
`;

const TitleInput = styled.input`
    display: inline-flex;
    width: 656px;
    height: 44px;
    padding: 0px 20px 0px 20px;
    margin: 0px 16px 30px 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid;
`;

const SelectContainer = styled.div`
    margin: 40px 0px 0px 0px;
    position: absolute;
`;

export default WantedUpload;