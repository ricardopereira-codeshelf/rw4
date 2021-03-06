/**
 * @flow
 */

import React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SampleText from './SampleText';

const NavControl = ({ navigation, pageTitle }) => (
  <ScrollView>
    <SampleText>{pageTitle}</SampleText>
    <Button onPress={() => navigation.navigate('ProfileNavigator', { name: 'Jane ' })} title="Go to Jane" />
    <Button onPress={() => navigation.navigate('Profile', { name: 'Jane INNER' })} title="Go to Jane INNER" />
    <Button onPress={() => navigation.navigate('Home')} title="HOME" />
    <Button onPress={() => navigation.navigate('HeaderTest')} title="Go to a header toggle screen" />
    {navigation.state.routeName === 'HeaderTest' && <Button title="Toggle Header" onPress={() => navigation.setParams({ headerVisible: !navigation.state.params || !navigation.state.params.headerVisible, })} />}
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <NavControl pageTitle="Home Screen" navigation={navigation} />
);
(MyHomeScreen as any).navigationOptions = { title: 'Welcome', };

const MyProfileScreen = ({ navigation }) => (
  <NavControl pageTitle={`${navigation.state.params.name}'s Profile`} navigation={navigation} />
);
(MyProfileScreen as any).navigationOptions = ({ navigation }) => ({ title: `${navigation.state.params.name}'s Profile!`, });

const ProfileNavigator = StackNavigator(
  {
    //Home: {
    //  screen: MyHomeScreen,
    //},
    Profile: {
      //path: 'people/:name',
      screen: MyProfileScreen,
    },
  },
  {
    navigationOptions: {
      //header: null,
    },
  }
);

const MyHeaderTestScreen = ({ navigation }) => (
  <NavControl pageTitle={`Full screen view`} navigation={navigation} />
);

(MyHeaderTestScreen as any).navigationOptions = ({ navigation }) => {
  const headerVisible = navigation.state.params && navigation.state.params.headerVisible;
  return {
    header: headerVisible ? undefined : null,
    title: 'Now you see me',
  };
};

const ModalStack = StackNavigator(
  {
    Home: {
      screen: MyHomeScreen,
    },
    ProfileNavigator: {
      screen: ProfileNavigator,
    },
    HeaderTest: {
      screen: MyHeaderTestScreen
    },
  },
  {
    mode: 'modal',
  }
);

export default ModalStack;
