import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../Components/CustomeButton';
import {LanguageSelector} from '../../../Components/LanguageSelector';
import {normalize} from '../../../Globals/theme';

import {Icon, Input, Pressable, Stack, FormControl, Select} from 'native-base';

const FormRegister = props => {
  return (
    <Stack w="100%" alignItems="center">
      <Stack>
        <FormControl isInvalid isRequired>
          <Stack space={2.5} w="100%">
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
              placeholder="Username"
              onChangeText={props?.setUsernameRegister}
            />
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
              onChangeText={props?.setEmailRegister}
            />
            <Select
              w={{
                base: '100%',
              }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Grade"
              onValueChange={value => props?.setGradeRegister(value)}
            >
              <Select.Item label="Grade 1" value={1} />
              <Select.Item label="Grade 2" value={2} />
              <Select.Item label="Grade 3" value={3} />
              <Select.Item label="Grade 4" value={4} />
              <Select.Item label="Grade 5" value={5} />
            </Select>
            <LanguageSelector
              placeholder="Original Language"
              onValueChange={props?.setOriginalLanguage}
            />
            <LanguageSelector
              placeholder="Translated Language"
              onValueChange={props?.setTranslatedLanguage}
            />

            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              type={props?.showRegister ? 'text' : 'password'}
              InputRightElement={
                <Pressable
                  onPress={() => props?.setShowRegister(!props?.showRegister)}
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name={
                          props?.showRegister ? 'visibility' : 'visibility-off'
                        }
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
              onChangeText={props?.setPasswordRegister}
            />
            <FormControl.ErrorMessage
              w="75%"
              display={props?.errorMsgRegister === '' ? 'none' : undefined}
            >
              {props?.errorMsgRegister}
            </FormControl.ErrorMessage>
            <CustomButton
              style={{margin: normalize(5)}}
              width={normalize(200)}
              title="Register"
              onPress={props?.registerUserRegister}
            />
          </Stack>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default FormRegister;
