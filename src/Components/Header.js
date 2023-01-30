import {COLORS, FONTS} from '../../constants';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Pressable,
  Fab,
} from 'native-base';

export function Header(props) {
  return (
    <Box mt={props.smallMarginTop === true ? '20px' : '1/4'}>
      <Stack mx="4" flexDirection="row" justifyContent="space-between" pb="6">
        <Heading color="info.500">{props.title}</Heading>
        {props.onFeedbackPress != undefined && (
          <Pressable onPress={props.onFeedbackPress}>
            {({isHovered, isFocused, isPressed}) => {
              return (
                <Box
                  top="0"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.9 : 1,
                      },
                    ],
                  }}
                  rounded="full"
                  bg="tertiary.600"
                  shadow={8}
                >
                  <Icon
                    as={<MaterialIcons name="info" />}
                    size={7}
                    color="tertiary.500"
                  />
                </Box>
              );
            }}
          </Pressable>
        )}
      </Stack>

      <Input
        mx="4"
        onChangeText={props.onSearchBarChange}
        width="90%"
        bg="gray.100"
        rounded="full"
        height="10"
        _focus={{bg: 'tertiary.200'}}
        InputRightElement={
          <Icon
            as={<MaterialIcons name="search" />}
            size={5}
            mr="4"
            color="tertiary.800"
          />
        }
        placeholderTextColor="tertiary.800"
        placeholder="Search book"
      />
    </Box>
  );
}
