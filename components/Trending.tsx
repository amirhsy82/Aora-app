import { 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ImageBackground, 
  Image,
  ViewToken
} from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import {Video, ResizeMode} from 'expo-av'
// images and icons
import { icons } from '@/constants'

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale:1.1 ,
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale:0.9 ,
  }
}
interface Item {
  $id: string;
  video: string
  thumbnail: string
}
interface TrendingItemProps {
  activeItem: object;
  item: Item;
}

const TrendingItem: React.FC<TrendingItemProps> = ({activeItem, item }) => {
  const [play, setPlay] = useState(false)
  console.log(activeItem)
  return (

    <Animatable.View 
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video 
          source= {{uri: item.video}}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if(status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity 
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>

            <ImageBackground 
              source={{
                uri : item.thumbnail
              }}
              className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-40'
              resizeMode='cover'
            />

            <Image
              source={icons.play}
              className='w-12 h-12 absolute'
              resizeMode='contain'
            />

          </TouchableOpacity>
      )}
    </Animatable.View>
  )
}



const Trending = ({posts}: {posts: any[] }) => {

  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemsChanged = ({ viewableItems }: {viewableItems: ViewToken[] }) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
        data={posts}
        horizontal
        keyExtractor={(item) => item.$id} 
        renderItem={({ item }) => (
           <TrendingItem
              activeItem={activeItem} 
              item={item}
           />  
        )}

        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170, y:0 }}
        
    />
  )
}

export default Trending