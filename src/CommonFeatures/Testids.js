import {Platform} from 'react-native';

export function getTestID(id) {
  return Platform.OS === 'android'
    ? {accessible: true, accessibilityLabel: id}
    : {testID: id};
}

export const testIds = {};
