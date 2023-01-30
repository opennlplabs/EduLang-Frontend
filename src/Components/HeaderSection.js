import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {Box, Heading, HStack, Pressable, Icon, Input, Stack} from 'native-base';

export function HeaderSection(props) {
  return (
    <Box flexDirection="row" justifyContent="space-between" my="6" mx="4">
      <Heading color="info.500">{props.title}</Heading>

      {props.buttonTitle != undefined && (
        <Pressable onPress={props.onButtonClick}>
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
                bg="tertiary.400:alpha.8"
                shadow={8}
              >
                <Icon
                  as={<MaterialIcons name="add" />}
                  size={5}
                  m="2"
                  color="tertiary.600"
                  alignSelf="center"
                />
              </Box>
            );
          }}
        </Pressable>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: 35,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Title: {
    paddingLeft: 20,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    width: '71%',
  },
  Button: {
    position: 'relative',
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
    padding: 7,
    backgroundColor: '#dbdbdb',
    borderRadius: 10,
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
    paddingLeft: 3,
  },
});
