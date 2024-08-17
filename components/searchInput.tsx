import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';
// Icons
import {icons} from '../constants'

interface Props {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  otherStyles: string;
  keyboardType?: string;
};

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}: Props) => {

  const [showPassword, setshowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 
      bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="felx-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide }
              className='w-6 h-6 ml-64'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField