import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native'

type Props = {
  result: string;
};

const StyleView = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
`;

export function IntroView({ result }: Props): React.ReactElement {
  return (
    <StyleView>
      <ScrollView>
        <Text>{result}</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </StyleView>
  );
};
