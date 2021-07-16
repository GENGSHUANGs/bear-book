import { useState, useEffect, useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import Layout, { ContentView, usePopup } from '../components/layout.js';
import Button from '../components/button.js';
// import OpenStationPopupView from '../components/open-station-popup-view.js';

export default () => {
  const dispatch = useDispatch();
  const [mapContext, setMapContext] = useState();

  const { popupModal } = usePopup();
  useEffect(() => {
    // popupModal(<OpenStationPopupView stationId={33} />);
    // popupModal(<OpenStationPopupView stationId={29} />);
    // setTimeout(() => popupModal(<OpenStationPopupView stationId={29} />), 2000);
    // popupModal(
    //   <View>
    //     <Text>Popup Test View {Date.now()}</Text>
    //   </View>,
    // );
  }, []);

  const onClickHandler = useCallback(() => {
    popupModal(
      <View>
        <Text>Popup Test View {Date.now()}</Text>
      </View>,
    );
  });

  return (
    <Layout>
      <ContentView>
        <Button onClick={onClickHandler}>Popup</Button>
      </ContentView>
    </Layout>
  );
};
