import { ScrollView, View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import React from 'react'
import { Link } from 'expo-router'
// images
import { images } from '../../constants'
// components
import FormField from '@/components/formField'
import CustomButton from '@/components/customButton'

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',

})

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () => {

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView> 
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo} 
            resizeMode='contain'
            className='w-[115px] h-[35px] mt-10'
          />

          <Text className='text-3xl text-white text-semibold mt-10 font-psemibold'>
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({...form, username: e})}
            otherStyles="mt-10"
            keyboardType="email-address"
          /> 
          
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-5"
            keyboardType="email-address"
          /> 

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-5"
            keyboardType="email-address"
          /> 

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyle='mt-10'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-rwo gap-2'>
            <Text className='text-sm text-gray-100 font-pregular text-center'>
              Have an Account? {''}
              <Link href="/sign-in" className='text-lg font-psemibold text-secondary-100'>Sign in</Link>
            </Text>
            
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp