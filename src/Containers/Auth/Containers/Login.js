import React, {useEffect, useState} from 'react';
import {Keyboard, Dimensions} from 'react-native';

import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import LoginComponent from '../components/LoginComponent';
import logo from '../../../assets/images/RealEduLangLogo.png';
import i18n from '../../../Locale';
import {
  createUser,
  loginEmailPassword,
  setUserInfo,
} from '../../../CommonFeatures/Services/StorageUtils/UserStorage';
import {useIsFocused} from '@react-navigation/native';
import {Strings} from '../../../CommonFeatures/Strings'; // need to used for translations better way do it
import {useKeyboardShow} from '../../../CommonFeatures/Services/hooks/useKeyboardShow';
const {height: HEIGHT} = Dimensions.get('window');

const Home = ({navigation, route}) => {
  // Decides which form to show
  const [formSelected, setFormSelected] = useState(null);
  const isFocused = useIsFocused();

  // Form Login
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailErrorMsg, setEmailErrorMsg] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);

  // Form Register
  const [showRegister, setShowRegister] = React.useState(false);
  const [grade, setGrade] = React.useState(-1);
  const [emailRegister, setEmailRegister] = React.useState('');
  const [usernameRegister, setUsernameRegister] = React.useState('');
  const [errorMsgRegister, setErrorMsgRegister] = React.useState('');
  const [passwordRegister, setPasswordRegister] = React.useState('');
  const [translatedLanguage, setTranslatedLanguage] = React.useState('');
  const [originalLanguage, setOriginalLanguage] = React.useState('');

  async function registerUser() {
    setErrorMsgRegister('');
    // notify user that message
    if (usernameRegister === '') {
      setErrorMsgRegister('Please enter a username!');
      return;
    }
    if (emailRegister === '') {
      setErrorMsgRegister('Please enter a email!');
      return;
    }
    if (grade === -1) {
      setErrorMsgRegister('Please select a grade!');
      return;
    }
    if (originalLanguage === '') {
      setErrorMsgRegister('Please select an original language!');
      return;
    }
    if (translatedLanguage === '') {
      setErrorMsgRegister('Please select a translated language!');
      return;
    }
    if (translatedLanguage === originalLanguage) {
      setErrorMsgRegister(
        'Your translated language cannot be equal to your original language!'
      );
      return;
    }
    if (password === '') {
      setErrorMsgRegister('Please enter a password!');
      return;
    }

    await createUser(email, password)
      .catch(err => {
        switch (err) {
          case 'auth/email-already-in-use':
            setErrorMsgRegister('Email address already in use.');
            break;
          case 'auth/invalid-email':
            setErrorMsgRegister('Email address is invalid.');
            break;
          case 'auth/weak-password':
            setErrorMsgRegister('Password is not strong enough.');
            break;
          default:
            setErrorMsgRegister('Unknown error with error code ' + err?.code);
            break;
        }
      })
      .then(async () => {
        await setUserInfo(
          originalLanguage,
          translatedLanguage,
          grade,
          usernameRegister
        );
        navigation.navigate('Tabs');
      });
  }

  function loginUser() {
    if (email === '') {
      setIsInvalid(true);
      setEmailErrorMsg('Enter your email address');
      setPasswordErrorMsg('');
      return;
    }
    if (password === '') {
      setIsInvalid(true);
      setEmailErrorMsg('');
      setPasswordErrorMsg('Enter your password');
      return;
    }

    loginEmailPassword(email, password)
      .then(() => {
        setIsInvalid(false);
        i18n.changeLanguage('en');
        navigation.replace('Tabs');
      })
      .catch(error => {
        // if we can't login, then notify the user the problem
        setIsInvalid(true);
        switch (error) {
          case 'auth/wrong-password':
            setPasswordErrorMsg('Incorrect password');
            setEmailErrorMsg('');
            break;
          case 'auth/invalid-email':
            setPasswordErrorMsg('');
            setEmailErrorMsg('Invalid Email');
            break;
          case 'auth/user-not-found':
            setEmailErrorMsg('User not found.');
            setPasswordErrorMsg('');
            break;
          default:
            setEmailErrorMsg('');
            setPasswordErrorMsg('Error Message: ' + error);
            break;
        }
      });
  }

  // Allows animation
  const imagePosition = useSharedValue(1);
  const formPosition = useSharedValue(1);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0.01, 1],
      [-HEIGHT / 1.5, 0]
    );
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });
  // helps detect if keyboard is display
  const isKeyboardVisible = useKeyboardShow();
  useEffect(() => {
    if (isKeyboardVisible) {
      if (formSelected === 'login') {
        formPosition.value = -0.3;
      } else {
        formPosition.value = -0.45;
      }
    } else {
      formPosition.value = 1;
    }
  }, [isKeyboardVisible]);

  // helps move everything up when keyboard is display
  const keyboardAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      formPosition.value,
      [0, 1],
      [-HEIGHT / 4, 0]
    );
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 400})}],
    };
  });
  // toggles Animatin
  const animatedBottonsStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [255, 0]);
    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });
  const closeBottonStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {duration: 800}),
      transform: [
        {rotate: withTiming(interpolation + 'deg', {duration: 1000})},
      ],
      marginBottom: 10,
    };
  });
  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, {duration: 800}))
          : withTiming(0, {duration: 300}),
    };
  });
  const showFormsLoginHandler = () => {
    setFormSelected('login');
    imagePosition.value = 0;
  };
  const showFormsRegisterHandler = () => {
    setFormSelected('register');
    imagePosition.value = 0;
  };
  const exitHandler = () => {
    imagePosition.value = 1;
    // setFormSelected(null);
  };

  // useEffect(async () => {
  //   // Set local variables
  //   await Storage.setItem({
  //     key: 'data',
  //     value: '[]',
  //   });
  //   await Storage.setItem({
  //     key: 'titles',
  //     value: '[]',
  //   });
  //   await Storage.setItem({
  //     key: 'favBooks',
  //     value: '[]',
  //   });
  //   await Storage.setItem({
  //     key: 'completedBooks',
  //     value: '[]',
  //   });
  // }, [isFocused]);

  // useEffect(() => {
  //   const onRenderFunc = async () => {
  //     // Set local variables
  //     await Storage.setItem({
  //       key: 'data',
  //       value: '[]',
  //     });
  //     await Storage.setItem({
  //       key: 'titles',
  //       value: '[]',
  //     });
  //     await Storage.setItem({
  //       key: 'favBooks',
  //       value: '[]',
  //     });
  //     await Storage.setItem({
  //       key: 'completedBooks',
  //       value: '[]',
  //     });
  //   };
  //   onRenderFunc();
  // }, [isFocused]);

  return (
    <LoginComponent
      headingLabel={Strings?.Auth?.appQuote}
      Keyboard={Keyboard}
      imageAnimatedStyle={imageAnimatedStyle}
      logo={logo}
      animatedBottonsStyle={animatedBottonsStyle}
      showFormsLoginHandler={showFormsLoginHandler}
      showFormsRegisterHandler={showFormsRegisterHandler}
      formSelected={formSelected}
      keyboardAnimatedStyle={keyboardAnimatedStyle}
      closeBottonStyle={closeBottonStyle}
      exitHandler={exitHandler}
      formAnimatedStyle={formAnimatedStyle}
      navigation={navigation}
      show={show}
      password={password}
      passwordErrorMsg={passwordErrorMsg}
      email={email}
      emailErrorMsg={emailErrorMsg}
      isInvalid={isInvalid}
      loginUser={loginUser}
      showRegister
      grade={grade}
      emailRegister={emailRegister}
      usernameRegister={usernameRegister}
      errorMsgRegister={errorMsgRegister}
      passwordRegister={passwordRegister}
      translatedLanguage={translatedLanguage}
      originalLanguage={originalLanguage}
    />
  );
};

export default Home;
