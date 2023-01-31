import {StyleSheet} from 'react-native';
import theme from '../../../Globals/theme';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
  },
  keyboardContainer: {
    zIndex: -1,
  },

  buttonsContainer: {
    zIndex: 2,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 75,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  logoText: {
    zIndex: 2,
    fontSize: 40,
  },
});
