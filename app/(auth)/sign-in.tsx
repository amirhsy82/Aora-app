import { ScrollView, View, Text, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import React from 'react'
import { Link, router } from 'expo-router'
// images
import { images } from '../../constants'
// components
import FormField from '@/components/formField'
import CustomButton from '@/components/customButton'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    email: '',
    password: '',

})

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if (form.email === ""|| form.password === ""){
      Alert.alert('Error', "Please fill in all fields")
    }

    setisSubmitting(true);
    try {
      await signIn(form.email, form.password)

      const result = await getCurrentUser()
      setUser(result)
      setIsLoggedIn(true)
      router.replace("/home")

    } catch (error) {
      const err = error as Error
      Alert.alert('Error', err.message)
      router.replace("/home")
      
    } finally {
      setisSubmitting(false)
    }
  
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView> 
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo} 
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-3xl text-white text-semibold mt-10 font-psemibold'>
            Log in to Aora
          </Text>
          
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          /> 

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-4"
            keyboardType="email-address"
          /> 

          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyle='mt-24'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-rwo gap-2'>
            <Text className='text-sm text-gray-100 font-pregular text-center'>
              Don't have an account? {''}
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary-100'>Sign up</Link>
            </Text>
            
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn