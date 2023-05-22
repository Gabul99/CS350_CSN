import React from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import { SubscribedState } from "../../screens/subscribed/SubscribedScreen";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  padding: 0 16px;
`;

const Icons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Title = styled.Text`
  font-family: 'Helvetica Neue';
  font-size: 24px;
  font-weight: 700;
  margin-right: auto;
`;

const SearchContainer = styled.View`
  width: 100%;
  align-items: center;
  gap: 8px;
  display: flex;
  flex-direction: row;
`;

const SearchTextInput = styled.TextInput`
  flex-grow: 1;
  background-color: #F5F8F9;
  height: 28px;
  padding: 0 16px;
`;

interface Props {
  state: SubscribedState;
  setState: (value: SubscribedState) => void;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
}

const SubscribeTopBar = ({ state, setState, searchKeyword, setSearchKeyword }: Props) => {
  return (
    <Container>
      {state === SubscribedState.FEED &&
      <>
        <Title>Subscribed</Title>
        <Icons>
          <TouchableOpacity onPress={() => setState(SubscribedState.NAVIGATE)}>
          <WithLocalSvg asset={require("../../assets/icons/ic_explore.svg")} width={28} height={28} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setState(SubscribedState.SEARCH)}>
            <WithLocalSvg asset={require("../../assets/icons/ic_search.svg")} width={28} height={28} />
          </TouchableOpacity>
        </Icons>
      </>
      }
      {state === SubscribedState.SEARCH &&
      <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}
                 onBack={() => setState(SubscribedState.FEED)} />
      }
      {state === SubscribedState.NAVIGATE &&
      <SearchContainer>
        <TouchableOpacity onPress={() => setState(SubscribedState.FEED)}>
          <WithLocalSvg asset={require("../../assets/icons/ic_arrow_back.svg")} width={24} height={24} />
        </TouchableOpacity>
        <Title>Navigate Clubs</Title>
      </SearchContainer>
      }
    </Container>
  );
};

interface SearchProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  onBack: () => void;
}

const SearchBar = ({ searchKeyword, setSearchKeyword, onBack }: SearchProps) => {
  return <SearchContainer>
    <TouchableOpacity onPress={onBack}>
      <WithLocalSvg asset={require("../../assets/icons/ic_arrow_back.svg")} width={24} height={24} />
    </TouchableOpacity>
    <SearchTextInput value={searchKeyword} onChangeText={setSearchKeyword} placeholder={"Search ..."} />
    <WithLocalSvg asset={require("../../assets/icons/ic_search.svg")} width={28} height={28} />
  </SearchContainer>;
};

export default SubscribeTopBar;
