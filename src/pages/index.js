import { Component, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { getNow } from '../actions/runtime';
import TitleBar, { ProfileButton, BackButton, Title, SearchInput } from '../components/title-bar.js';
import Taro, { useDidShow } from '@tarojs/taro';
import PopupTestView from './popup-test-view.js';
import { isTokenEmpty } from '../actions/request.js';
import Layout, { ContentView, usePopup, PopupContext } from '../components/layout';
import { connect } from 'react-redux';

const { screenHeight, safeArea } = Taro.getSystemInfoSync();

class Index extends Component {
  static contextType = PopupContext;
  constructor() {
    super();
    this.state = { loading: true };
  }

  render() {
    return (
      <Layout
        titleBar={
          <TitleBar>
            <ProfileButton />
            <SearchInput
              placeholder="输入位置查找门店"
              disabled={true}
              onClick={() =>
                Taro.navigateTo({
                  url: `./search?usrLocation=`,
                  events: {},
                })
              }
            />
          </TitleBar>
        }
      >
        <ContentView
          withoutPaceholder={true}
          style="width:100%;position: absolute;z-index: 9;left: 0px;bottom: 0px; height: unset;"
          className="index-content-view"
        >
          aaa
        </ContentView>
      </Layout>
    );
  }
}

export default connect(
  (state) => {
    return {
      isPartner: state.getIn(['profile', 'logedUser', 'data', 'isPartner']),
      currentOrder: state.getIn(['order', 'currentOrder']),
    };
  },
  (dispatch) => {
    return {
      remoteLoginWithWx: (code) => dispatch(remoteLoginWithWx(code)),
      isStationBelongTo: (stationId) => dispatch(isStationBelongTo(stationId)),
      getPartnerMaintainStation: () => dispatch(getPartnerMaintainStation()),
      getCurrentOrder: () => dispatch(getCurrentOrder()),
      activeShareCode: (shareCode) => dispatch(activeShareCode(shareCode)),
    };
  },
)(Index);
