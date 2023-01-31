import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../Components/CustomeButton';
import {Icon, Input, Pressable, Stack, FormControl} from 'native-base';
import {normalize} from '../../../Globals/theme';

const FormLogin = props => {
  return (
    <Stack space={4} w="100%" alignItems="center">
      <Stack>
        <FormControl isInvalid={props?.isInvalid} isRequired>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Email"
            onChangeText={text => props?.setEmail(text)}
          />
          <FormControl.ErrorMessage
            display={props?.emailErrorMsg === '' ? 'none' : undefined}
            leftIcon={<Ionicons name="alert-circle-outline" />}
          >
            {props?.emailErrorMsg}
          </FormControl.ErrorMessage>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            w={{
              base: '75%',
              md: '25%',
            }}
            onChangeText={text => props?.setPassword(text)}
            type={props?.show ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => props?.setShow(!props?.show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={props?.show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
          />
          <FormControl.ErrorMessage
            display={props?.passwordErrorMsg === '' ? 'none' : undefined}
            leftIcon={<Ionicons name="alert-circle-outline" />}
          >
            {props?.passwordErrorMsg}
          </FormControl.ErrorMessage>
        </FormControl>
        <CustomButton
          style={{margin: normalize(5)}}
          width={normalize(200)}
          title="Login"
          onPress={props?.loginUser}
        />
      </Stack>
    </Stack>
  );
};

export default FormLogin;
