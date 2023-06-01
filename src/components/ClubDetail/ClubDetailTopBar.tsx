import React, {useState} from "react";
import styled from "styled-components/native";
import { WithLocalSvg } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { ClubDetailState, ClubMemberState } from "../../screens/my_clubs/ClubDetailScreen";
import CSText, { FontType } from "../core/CSText";

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
  margin-left: auto;
`;

interface Props {
  clubName: string;
  clubState: ClubMemberState;
  state: ClubDetailState;
  navigation: any;
  setState: (value: ClubDetailState) => void;
}

const ClubDetailTopBar = ({ clubName, clubState, state, setState, navigation}: Props) => {
  const [starred, setStarred] = useState(false);
  return (
    <Container>
      <TouchableOpacity onPress={() => 
        state === ClubDetailState.SETTING && setState(ClubDetailState.GENERAL) ||
        state === ClubDetailState.APPLIST && setState(ClubDetailState.SETTING) || 
        state === ClubDetailState.GENERAL &&navigation.goBack()}>{/* TODO : go back */}
        <WithLocalSvg asset={require("../../assets/icons/ic_arrow_back_ios.svg")} width={28} height={28} />
      </TouchableOpacity>
      <CSText fontType={FontType.BOLD} fontSize={20}>{clubName}</CSText>
      <Icons>
        {clubState === ClubMemberState.MEMBER || clubState === ClubMemberState.ADMIN && state === ClubDetailState.GENERAL &&
          <TouchableOpacity onPress={() => setStarred(!starred)}>
            {starred &&
            <>
              <WithLocalSvg asset={require("../../assets/icons/ic_selected_stars.svg")} width={28} height={28} />
            </>
            }
            {!starred &&
            <>
              <WithLocalSvg asset={require("../../assets/icons/ic_stars.svg")} width={28} height={28} />
            </>
            }
          </TouchableOpacity>
        }
        {clubState === ClubMemberState.ADMIN && state === ClubDetailState.GENERAL &&
          <TouchableOpacity onPress={() => setState(ClubDetailState.SETTING)}>
            <WithLocalSvg asset={require("../../assets/icons/ic_settings.svg")} width={28} height={28} />
          </TouchableOpacity>
        }
        {state === ClubDetailState.SETTING &&
          <TouchableOpacity onPress={() => {setState(ClubDetailState.GENERAL)}}>
            <WithLocalSvg asset={require("../../assets/icons/ic_check_circle.svg")} width={28} height={28} />
          </TouchableOpacity>
        }
      </Icons>
    </Container>
  );
};

interface SearchProps {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
  onBack: () => void;
}

export default ClubDetailTopBar;
