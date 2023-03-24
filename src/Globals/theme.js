import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
  const newSize = Math.ceil(size * scale);
  return newSize;
}

export default {
  FONT_SIZE_SMALL: Math.ceil(9 * scale),
  FONT_SIZE_MEDIUM: Math.ceil(14 * scale),
  FONT_SIZE_LARGE: Math.ceil(16 * scale),
  SCREEN_WIDTH: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT,
  SCREEN_HEIGHT: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH,

  CONTAINER_PADDING: normalize(18),
  SCREEN_PADDING: 0,
  FONT_WEIGHT_BOLD: '700',
  FONT_WEIGHT_REGULAR: '400',
  EDU_COLOR: '#93CB54',
  LANG_COLOR: '#4CA4D3',
  GREEN: 'rgb(134,218,20)',
  LOW: 'rgb(251, 192, 45)',
};

//NEED TO ADD APP FONTS HERE
export const FONT_FAMILY =
  Platform.OS === 'ios' ? 'SFProText-Regular' : 'Roboto';
