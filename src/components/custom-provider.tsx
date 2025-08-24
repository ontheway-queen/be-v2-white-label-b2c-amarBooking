'use client';

import { persistor, store } from '@/lib/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const CustomProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        > */}
        <div>{children}</div>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
};

export default CustomProvider;
