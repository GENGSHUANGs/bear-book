import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import configStore from './store';
import Taro, { useShareAppMessage } from '@tarojs/taro';

// 探针
// import fundebug from 'fundebug-wxjs';
// fundebug.init({
//   apikey: 'xxxxxx',
// });
// fundebug.test();

import './app.scss';
import { PopupContext, PopupView, PopupMask, PopupCloseButton, PopupContentLayout } from './components/layout.js';

const store = configStore();

export default ({ children }) => {
  let [popupViews, setPopupViews] = useState([]);
  return (
    <Provider store={store}>
      <PopupContext.Provider
        value={{
          popupViews,
          setPopupViews,
          popupView(view, clean = false) {
            popupViews = [...popupViews, view];
            setPopupViews(clean ? [view] : popupViews);
          },
          close(clean = false) {
            setPopupViews(clean ? [] : popupViews.slice(0, popupViews.length - 1));
          },
          clean() {
            setPopupViews([]);
          },
          popupModal(view, clean = false) {
            view = (
              <PopupView background={<PopupMask />}>
                <PopupCloseButton />
                <PopupContentLayout>{view}</PopupContentLayout>
              </PopupView>
            );
            popupViews = [...popupViews, view];
            setPopupViews(clean ? [view] : popupViews);
          },
        }}
      >
        {children}
      </PopupContext.Provider>
    </Provider>
  );
};
