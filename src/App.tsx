import React from 'react';
import logo from './logo.svg';
import './App.css';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  const VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  return (
    <Provider store={store}>
    <div className="App">
      <VideoPlayer videoUrl={VIDEO_URL} />
    </div>
    </Provider>  
  );
}

export default App;
