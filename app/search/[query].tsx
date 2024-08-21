import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  RefreshControl,
  Alert
} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

// Components and Images
import {images} from '../../constants'
import SearchInput  from '../../components/searchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { searchPosts } from '@/lib/appwrite'

const Search = () => {

  const {query} = useLocalSearchParams()
  const {data: posts, refetch} = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    refetch()
  }, [query])

  const onRefresh = async () => {
    
    await refetch()
    
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id} //used 'id' instead of '$id'*
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            
              
            <Text className="font-pmedium text-sm text-gray-100 ">
              Search Results 
            </Text>
            <Text className='text-2xl font-psemibold text-white'>
              {query}
            </Text>
            
            <View className='mt-6 mb-8'>
              <SearchInput 
                initialQuery={query}
              />
            </View>

          
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  )
}



export default Search