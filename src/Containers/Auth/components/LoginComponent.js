import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../Components/CustomeButton';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
import {Styles} from '../styles/LoginStyles';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import Animated from 'react-native-reanimated';

import {Box, Center, Heading, HStack} from 'native-base';
import theme, {normalize} from '../../../Globals/theme';

const LoginComponent = props => {
  return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback onPress={props?.Keyboard.dismiss}>
        <>
          <Animated.View
            style={[StyleSheet.absoluteFill, props?.imageAnimatedStyle]}
          >
            <Box>
              <Image
                resizeMode="cover"
                style={{height: HEIGHT * 0.2, width: WIDTH}}
                source={require('../../../assets/wave1.png')}
              />
              <Center>
                <HStack>
                  <Heading size="xl" color={theme.EDU_COLOR}>
                    Edu
                  </Heading>
                  <Heading size="xl" color={theme.LANG_COLOR}>
                    Lang
                  </Heading>
                </HStack>

                <Image source={props?.logo} style={Styles.logo} />
                <Heading size="sm" color={theme.LANG_COLOR}>
                  {props?.headingLabel}
                </Heading>
              </Center>
            </Box>
          </Animated.View>

          <Animated.View
            style={[props?.animatedBottonsStyle, Styles.buttonsContainer]}
          >
            <CustomButton
              style={{margin: normalize(5)}}
              width={normalize(200)}
              title="Login"
              onPress={props?.showFormsLoginHandler}
            />
            <CustomButton
              style={{margin: normalize(5)}}
              width={normalize(200)}
              title="Register"
              onPress={props?.showFormsRegisterHandler}
            />
          </Animated.View>

          <Center
            top={HEIGHT * (props?.formSelected === 'register' ? 0.29 : 0.37)}
            alignSelf="center"
          >
            <Animated.View style={props?.keyboardAnimatedStyle}>
              <Animated.View style={props?.closeBottonStyle}>
                <CustomButton
                  icon={
                    <MaterialIcons
                      name="close"
                      color="white"
                      style={{fontSize: theme.FONT_SIZE_LARGE}}
                    />
                  }
                  type="icon"
                  onPress={props?.exitHandler}
                />
              </Animated.View>
              <Animated.View style={props?.formAnimatedStyle}>
                <Box
                  zIndex={-1}
                  width={WIDTH}
                  height={HEIGHT}
                  borderTopRadius="100"
                  bg="gray.100"
                  pt="1/6"
                >
                  {props?.formSelected === 'login' && (
                    <FormLogin
                      navigation={props?.navigation}
                      isInvalid={props?.isInvalid}
                      setEmail={props?.setEmail}
                      emailErrorMsg={props?.emailErrorMsg}
                      setPassword={props?.setPassword}
                      show={props?.show}
                      passwordErrorMsg={props?.passwordErrorMsg}
                      loginUser={props?.loginUser}
                    />
                  )}
                  {props?.formSelected === 'register' && (
                    <FormRegister
                      isInvalid
                      setUsernameRegister={props?.setUsernameRegister}
                      setEmailRegister={props?.setEmailRegister}
                      setGradeRegister={props?.setGradeRegister}
                      setOriginalLanguage={props?.setOriginalLanguage}
                      setTranslatedLanguage={props?.setTranslatedLanguage}
                      showRegister={props?.showRegister}
                      setPasswordRegister={props?.setPasswordRegister}
                      errorMsgRegister={props?.errorMsgRegister}
                      registerUserRegister={props?.registerUserRegister}
                      navigation={props?.navigation}
                    />
                  )}
                </Box>
              </Animated.View>
            </Animated.View>
          </Center>
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginComponent;
