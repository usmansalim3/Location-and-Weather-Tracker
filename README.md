# Travel Companion App

Application that tracks user location, weather and pollution data along with news articles with the functionality to save them on database.

## Features
- User registration, profile setup 
- Look up different maps of current location i.e satellite images, traffic near your area etc
- Save current location to keep track of your journey
- Go through weather conditions and AQI level at your location
- Read, search, save news articles on the go


## Tech Stack

**Client:** React-native, Expo , Expo Maps API

**State Management :** ReduxToolkit, Context-api , async storage , redux , formik(input validation)

**Styling:** React-native paper, React-native elements , react-native-responsive-dimensions


**Backend:** Firebase , Firestore


## Optimizations & Techniques

- Memoizing components to prevent unnecessary re-renders 
- Attached Firebase Event listeners to update saved/unsaved news posts state
- Updates location and weather info everyone 3 minutes 

## Screenshots

![wt1](https://github.com/usmansalim3/openAI/assets/112751010/d85a6df8-b4cd-4f67-b7fe-c4d8bcc697aa)
![wt2](https://github.com/usmansalim3/openAI/assets/112751010/adf491d4-2ebe-4f46-b5c3-d3933c252c11)
![Screenshot 2024-02-01 231029](https://github.com/usmansalim3/Location-and-Weather-Tracker/assets/112751010/9fa3713f-f840-475d-8142-f5154aeb7497)

## Demo

https://github.com/usmansalim3/Location-and-Weather-Tracker/assets/112751010/82b17be9-0dee-4d4a-8b93-16b480b2ba82

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





