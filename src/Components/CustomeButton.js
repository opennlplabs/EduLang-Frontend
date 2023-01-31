import {Box, Pressable, Text} from 'native-base';
import React from 'react';
import theme, {normalize} from '../Globals/theme';
const CustomButton = props => {
  return (
    <Pressable style={props?.style} onPress={props?.onPress}>
      {({isHovered, isFocused, isPressed}) => {
        return (
          <Box
            style={{
              transform: [
                {
                  scale: isPressed ? 0.9 : 1,
                },
              ],
            }}
            rounded="full"
            px={props?.type === 'button' ? '20' : '0'}
            bg="tertiary.400:alpha.8"
            py="2"
            shadow={8}
            alignSelf="center"
            w={props?.width}
          >
            {props?.icon != undefined ? (
              <Box
                w={props?.type === 'button' ? '24' : '10'}
                h={props?.type === 'icon' ? '6' : undefined}
                alignItems="center"
                justifyContent="center"
                shadow={8}
              >
                {props?.icon}
              </Box>
            ) : (
              <Text color="white" textAlign="center">
                {props?.title}
              </Text>
            )}
          </Box>
        );
      }}
    </Pressable>
  );
};
export default CustomButton;
