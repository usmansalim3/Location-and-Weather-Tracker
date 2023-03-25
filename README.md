
# Travel Companion App

Application that tracks user location, weather and pollution data along with news articles with the functionality to save them on database.

## Features
- User registration, profile setup 
- Look up different maps of current location i.e satellite images, traffic near your area etc
- Save current location to keep track of your journey
- Go through weather conditions and AQI level at your location
- Read, search, save news articles on the go


## Tech Stack

**Client:** React-native, Expo

**State Management :** ReduxToolkit, Context-api , async storage , formik(input validation)

**Styling:** React-native paper, React-native elements , react-native-responsive-dimensions


**Backend:** Firebase , Firestore


## Optimizations

Memoizing components to prevent unnecessary re-renders 


## Demo

https://user-images.githubusercontent.com/112751010/227322933-d57c902f-3abd-4d14-be17-96deb0b8ee12.mp4

(Password entry is hidden in the screen recording along with the gallery when choosing profile picture)

https://user-images.githubusercontent.com/112751010/227319918-d9424256-bcaf-4294-945b-3d847d00699c.mp4




## Roadmap

- Making the UI more responsive (fixing keyboardAvoidingView in two screens)

- Make more details about weather and pollution available and adding the past and future weather forecast

## Lessons Learned

- Making a responsive UI
- API requests & firebase authentication 
- Making state available across screens with context API and Redux global store along with async thunks
- Working and behavior of React Navigation i.e when are the screens mounted and unmounted depending on the type of screen used (Bottom TabBar vs stack vs TabBar) and disabling back navigation 
- Difference between Expo and React Native CLI



## Screenshots

![WhatsApp Image 2023-03-22 at 3 38 51 PM](https://user-images.githubusercontent.com/112751010/227320554-d6738f47-cbaf-4cfd-8288-5e34ccc53e40.jpeg)
![WhatsApp Image 2023-03-22 at 3 38 43 PM](https://user-images.githubusercontent.com/112751010/227320547-0e5a62d6-5fb9-4b18-8bf0-9cd764a21a8c.jpeg)
![WhatsApp Image 2023-03-19 at 2 36 51 AM](https://user-images.githubusercontent.com/112751010/226165655-73605f82-31fe-4af1-851f-10f314363dcc.jpeg)
![WhatsApp Image 2023-03-19 at 2 36 59 AM](https://user-images.githubusercontent.com/112751010/226165661-23f03141-bd1f-4bfc-b5f3-fbe986e83633.jpeg)
![WhatsApp Image 2023-03-19 at 2 37 00 AM](https://user-images.githubusercontent.com/112751010/226165667-815d33ba-ce6a-4376-940c-b295074b7d2e.jpeg)
![WhatsApp Image 2023-03-22 at 3 38 01 PM](https://user-images.githubusercontent.com/112751010/227320526-335226c7-2e47-43a4-b990-0bf70859f329.jpeg)
![WhatsApp Image 2023-03-24 at 12 36 023 AM](https://user-images.githubusercontent.com/112751010/227321941-07dc1a36-e182-47fa-acd4-33b36c6d08f2.jpeg)
![WhatsApp Image 2023-03-24 at 12 36 02 AM](https://user-images.githubusercontent.com/112751010/227321936-c637c9a2-3e7d-4590-9873-f60ac6e29c55.jpeg)
![WhatsApp Image 2023-03-22 at 3 52 28 PM](https://user-images.githubusercontent.com/112751010/227320561-0017bda2-bd26-4d57-80c3-3f5d0c308bed.jpeg)


