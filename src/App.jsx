import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Body from './components/Body';
import Profile from './components/Profile';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import EditProfile from './components/editProfile';
import NetworkToast from './components/ui/NetworkToast';
import ToastContainer from './components/ui/ToastContainer';
import Navbar from './components/Navbar';
import { ToastProvider } from './context/ToastContext';
import Request from './components/Requests';
import Connections from './components/Connections';

function App() {
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen bg-base-100">
            <BrowserRouter basename='/'>
              <Navbar />
              <Routes>
                <Route path="/" element={<Body />}>
                  <Route index element={<Feed />} />
                  <Route path="login" element={<Login />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="edit-profile" element={<EditProfile />} />
                  <Route path="request" element={<Request />} />
                  <Route path="connections" element={<Connections />} />
                </Route>
              </Routes>
              <NetworkToast />
              <ToastContainer />
            </BrowserRouter>
          </div>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
