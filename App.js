import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login, NavContainer, Otp, Signup, User, UserTab } from './Screens';
import { Provider } from 'react-redux';
import { persistedStore, store } from './Store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>

<NavContainer/>
{/* <User/>
 */}
 {/* <UserTab/> */}




      </PersistGate>
    </Provider>
    // <Login/>
    // <Signup/>
    // <Otp/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
