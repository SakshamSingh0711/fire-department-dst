import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import branchReducer from './slices/branchSlice';
import fileReducer from './slices/fileSlice';
import personnelReducer from './slices/personnelSlice';
import alertReducer from './slices/alertSlice';
import designationReducer from './slices/designationSlice'; // ✅ Add this line

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  branches: branchReducer,
  files: fileReducer,
  personnel: personnelReducer,
  alert: alertReducer,
  designation: designationReducer // ✅ Add this reducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

const persistor = persistStore(store);

export { store, persistor };
export default store;