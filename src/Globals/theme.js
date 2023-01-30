import {Dimensions, Platform, PixelRatio} from 'react-native';;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');;

export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
  const newSize = Math.ceil(size * scale);;
  return newSize;;
}
export const isTab = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1824 || adjustedHeight >= 1824)
  ) {
    return true;;
  } else {
    return false;;
  }
};

export default {
  FONT_SIZE_XXX_SMALL: Math.ceil(9 * scale),
  FONT_SIZE_XX_SMALL: Math.ceil(10 * scale),
  FONT_SIZE_EXTRA_SMALL: Math.ceil(11 * scale),
  FONT_SIZE_SMALL: Math.ceil(12 * scale),
  FONT_SIZE_LOW_MEDIUM: Math.ceil(13 * scale),
  FONT_SIZE_MEDIUM: Math.ceil(14 * scale),
  FONT_SIZE_LARGE: Math.ceil(16 * scale),
  FONT_SIZE_HLARGE: Math.ceil(18 * scale),
  FONT_SIZE_XLARGE: Math.ceil(20 * scale),
  FONT_SIZE_XXLARGE: Math.ceil(36 * scale),
  FONT_SIZE_XXXLARGE: Math.ceil(44 * scale),
  FONT_SIZE_XMEDIUM: Math.ceil(17 * scale),
  FONT_SIZE_XXMEDIUM: Math.ceil(20 * scale),
  FONT_SIZE_XXMEDIUMLARGE: Math.ceil(24 * scale),
  FONT_SIZE_XXXMEDIUMLARGE: Math.ceil(28 * scale),
  FONT_SIZE_XXLMEDIUMLARGE: Math.ceil(25 * scale),
  FONT_SIZE_XLXLARGE: Math.ceil(34 * scale),
  FONT_SIZE_XLMEDIUMLARGE: Math.ceil(26 * scale),
  FONT_SIZE_XXVMEDIUMLARGE: Math.ceil(27 * scale),
  FONT_SIZE_XVXLARGE: Math.ceil(64 * scale),

  SCREEN_WIDTH: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT,
  SCREEN_HEIGHT: SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH,

  CONTAINER_PADDING: normalize(18),
  SCREEN_PADDING: 0,
  FONT_WEIGHT_BLACK: '900',
  FONT_WEIGHT_HEAVY: '800',
  FONT_WEIGHT_BOLD: '700',
  FONT_WEIGHT_SEMIBOLD: '600',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_REGULAR: '400',

  PRIMARY_COLOR_DARK: 'rgb(12, 52, 113)',
  PRIMARY_COLOR_DARK_OPACITY_20: 'rgba(12, 52, 113, 0.2)',
  PRIMARY_COLOR_DARK_OPACITY_1: 'rgba(12, 52, 113, 1)',
  LIGHT_BLUE_BACKGROUND: 'rgb(240,248,254)',
  PRIMARY_COLOR_LIGHT: 'rgb(0, 138, 188)',
  PRIMARY_COLOR_LIGHTER: 'rgb(27, 177, 233)',
  PRIMARY_COLOR_LIGHT_OPACITY_10: 'rgba(0, 138, 188, 0.1)',
  PRIMARY_COLOR_LIGHT_OPACITY_20: 'rgba(0, 138, 188, 0.2)',
  PRIMARY_COLOR_LIGHT_OPACITY_30: 'rgba(0, 138, 188, 0.3)',
  PRIMARY_COLOR_LIGHT_OPACITY_50: 'rgba(0, 138, 188, 0.5)',
  ADD_DOSE_COLOR: 'rgb(110,183,11)',
  SECONDARY_COLOR: 'rgb(88, 89, 91)',
  SCREEN_BACKGROUND_COLOR: 'rgb(255, 255, 255)',
  WHITE_COLOR: 'rgb(255, 255, 255)',
  ERROR: 'rgb(255, 45, 85)',
  SUCCESS: 'rgb(110, 183, 11)',
  GREY: 'rgb(224,224,224)',
  SECONDARY_COLOR_OPACITY: 'rgba(88,89,91,0.5)',
  SECONDARY_COLOR_OPACITY20: 'rgba(88,89,91,0.2)',
  SECONDARY_COLOR_OPACITY1: 'rgba(88,89,91,1)',
  WEAK: 'rgb(255, 45, 85)',
  NONE: 'rgb(224,224,224)',
  MEDIUM: 'rgb(245,166,35)',
  BATTERY_GREEN: 'rgb(111,183,11)',
  CHECKBOX_COLOR: 'rgb(235,235,235)',
  BUTTON_TEXT_COLOR: '#f9f8f8',
  DISABLE_BUTTON: '#e0e0e0',
  PRIMARY_BORDER: 'rgb(235,235,235)',
  INFO_TEXT_COLOR: 'rgb(174,174,192)',
  PRIMARY_BTN_HEIGHT: Math.ceil(48 * scale),
  PRIMARY_LINE_HEIGHT: Math.ceil(24 * scale),
  TITLE_LINE_HEIGHT: Math.ceil(34 * scale),
  SECONDARY_LINE_HEIGHT: Math.ceil(18 * scale),
  SEPARATOR_LIGHT: 'rgb(224,242,252)',
  BLACK: 'rgb(0,0,0)',
  STEP_INDICATOR_COLOR: 'rgba(0,0,0,0.2)',
  TRANSLUCENT_BLACK: 'rgba(0,0,0,0.5)',
  DISABLE_TEXT_COLOR: 'rgba(249,248,248,0.5)',
  DISABLE_BUTTON_COLOR: 'rgb(224,224,224)',
  DISABLE_BUTTON_OPACITY_0_2: 'rgba(224,224,224,0.2)',
  LIGHT_GREY: 'rgba(88,89,91,0.5)',
  DARK1_GREY: 'rgb(88,89,91)',
  LIGHT_SILVER: 'rgb(174,179,192)',
  OFF_WHITE_BACKGROUND: 'rgba(240,248,254,1)',
  DARK_RED: 'rgb(255,45,85)',
  INDICATOR_COLOR: '#006e96',
  GREEN: 'rgb(134,218,20)',
  MODAL_BACKDROP_COLOR: 'rgba(0,0,0,0.1)',
  MODAL_BACKDROP_COLOR1: 'rgba(0,0,0,0.3)',
  MODAL_PADDING: 28,
  TRANSPARENT: 'rgba(0,0,0,0)',
  WHITE_SMOKE_COLOR_OPACITY50: 'rgba(249, 248, 248, 0.5)',
  WHITE_SMOKE_COLOR: 'rgb(249, 248, 248)',
  LIGHT_BLUE_BORDER: 'rgb(224, 242, 252)',
  SHADOW_LIGHT_COLOR: 'rgba(27, 27, 78, 0.1)',
  LIGHT_BLUE_BAR_DEACTIVE: 'rgb(204, 232, 242)',
  LIGHT_BLUE_BAR_OPACITY_40: 'rgba(204, 232, 242, 0.4)',
  DARK_BLUE_BAR_DEACTIVE: '#CCE7F2',
  LIGHT_BLUE_BAR_ACTIVE: '#50B2D5',
  BLUE_GRAPH_AXIS_BAR: 'rgb(127,196,221)',
  BLUE_LOW_COLOR: 'rgb(217,238,245)',
  BLUE_OK_COLOR: 'rgb(178,220,235)',
  BLUE_HIGH_COLOR: 'rgb(182,194,212)',
  BLUE_GRAPH_AREA: 'rgb(180, 242, 252)',
  DARK_GREY: 'rgb(171, 172, 173)',
  LOW: 'rgb(251, 192, 45)',
  MAGENTA_LIGHTS: 'rgb(189, 16, 224)',
  RED_LIGHTS: 'rgb(226, 62, 20)',
  ALBASTER: 'rgb(249, 248, 248)',
  LOGOUT_TEXT_COLOR: 'rgb(3, 3, 3)',
  LOGOUT_CANCEL: '#007aff',
  LOGOUT_SUBMIT: '#ff5325',
  PRIMARY_COLOR_XLIGHT: '#7fc4dd',
  SUMPPUMP_DASHBOARD_SLIDER: 'rgb(14, 46, 102)',
  IMBALANCED_COLOR: 'rgb(255, 152, 0)',
  ACCUWEATHER_COLOR: 'rgb(243, 111, 33)',
  CAMERA_OVERLAY_COLOR: 'rgba(0, 0, 0, 0.8)',
  DANGER: 'rgb(255, 0, 79)',
  GRAPH_ORANGE_LIGHT: 'rgba(245, 166, 35, 0.5)',
  GRAPH_YELLOW_LIGHT: 'rgba(255, 208, 0, 0.5)',
  GRAPH_GREEN_LIGHT: 'rgba(110, 183, 11, 0.5)',
  BLUE_LOW_STOP: 'rgb(17, 174, 231)',
  BLUE_HIGH_STOP: 'rgb(0, 138, 188)',
  BLEACH: 'rgb(244,244,244)',
  DARK_PROVISIONING: '#333333',
  HEADER_BLUE: '#0372CD',
  SUCCESS_GREEN: 'rgb(27,162,67)',
  LIST_DIVIDER: '#EBEBEB',
  WEAK_SIGNAL: '#FA0000',
  STRON_SIGNAL: '#1BA243',
  OK_SIGNAL: '#FC8E1D',
  EDIT_ICON_TINT: '#9A9A9A',
  PROVISIONING_BLUE: '#0C3471',
  SEPERATOR_GREY: '#EBEBEB',
  STRENGTH_WEAK: '#FA0000',
  SELECTED_BLUE: '#006E96',
  REMOVE_RED: '#E00932',
  OPTION_BUTTON_BLUE: '#008ABC',
  WARNING_RED: '#E00931',
  DISABLE_BUTTON_SPEEDEO: '#9A9A9A',
  darkRed: 'rgb(224,9,50)',
  BUTTON_ACTIVE_COLOR: '#EDF6F9',
  BUTTON_ACTIVE_BORDER_COLOR: '#3D8BB8',
  BUTTON_INACTIVE_BORDER_COLOR: '#E6F1F7',
  ARC_START_COLOR: '#1E90FF',
  ARC_END_COLOR: '#87CEFA',
  LIGHT_BLEACH: '#BFC1C4',
  BlueShadowButtonColor: '#006E96',
  GREY_BLACK: 'rgb(51, 51, 51)',
  GREY_RED: 'rgb(rgb(224, 9, 50)',
  GREYISH: 'rgb(154,154,154)',
  NAVY_BLUE: 'rgb(3, 114, 205)',
  SKY_BLUE: 'rgba(0, 110, 150, 1)',
  SKY_BLUE_OPACITY: 'rgba(0, 110, 150, 0.3)',
  SLIDER_START_COLOR: 'rgba(252,124,0,0.35)',
  SLIDER_END_COLOR: '#EA4800',
  SLIDER_OFFLINE_COLOR: '#CCE8F2',
  NEW_THEME_BLUE: '#0B3471',
  PINK_RED: '#FCE6EB',

  NEW_ROW_BACKGROUND: '#F4F4F4',
  PENTAIR_BLUE: '#0B3471',
  DEVICE_STATUS_GREEN: '#4F8309',
  GRAPH_DARK_BLUE: '#0B3471',
  NEW_DIVIDER_STYLE: '#EBEBEB',
  NEW_THEME_BLUE_OPACITY_70: '#0B347178',
  SWIPE_LIST_BACKGROUND: '#DDD',
  DRAWER_BG: '#47618c',
  PENTAIR_GREEN: '#4F8309',
  PENTAIR_GREEN_OPACITY: '#E3EBD8',
  WARNING_MED: '#FA6400',
  LOW_ORANGE: '#FA6400',
  PENTAIR_BLUE_LIGHT: '#e6ebf0',
  SUCCESS_DARK: '#4A7B09',
  WARNING_ORANGE: '#FF9D00',
  STATUS_BAR_BLUE: '#3F51B5',
  DISABLE_PUMP_COLOR: 'rgba(88, 89, 91, 0.75)',
  OPTION_BUTTON_GRAY: '#e5e1e0',
  CYAN_BG_COLOR: '#F1FBFF',,
};

export const FONT_FAMILY =
  Platform.OS === 'ios' ? 'SFProText-Regular' : 'Roboto';;

export const Fonts = {
  regular: 'SFProText-Regular',
  heavy: 'SFProText-Heavy',
  medium: 'SFProText-Medium',
  semiBold: 'SFProText-Semibold',
  bold: 'SFProText-Bold',
  black: Platform.OS === 'ios' ? 'SFProText-Black' : 'SF-Pro-Text-Black',
  regularDisplay:
    Platform.OS === 'ios' ? 'SFProDisplay-Regular' : 'SF-Pro-Display-Regular',
  heavyDisplay:
    Platform.OS === 'ios' ? 'SFProDisplay-Heavy' : 'SF-Pro-Display-Heavy',
  mediumDisplay:
    Platform.OS === 'ios' ? 'SFProDisplay-Medium' : 'SF-Pro-Display-Medium',
  boldDisplay:
    Platform.OS === 'ios' ? 'SFProDisplay-Bold' : 'SF-Pro-Display-Bold',
  barlowMedium: 'Barlow-Medium',,
};

export const Poppins = {
  bold: 'Poppins-Bold',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-Semibold',
  light: 'Poppins-Light',
};
