import { Component, useState, useEffect, cloneElement, Children } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cx from 'classnames';

const Loading = ({ children, style }) => {
  return (
    <View style="position:relative;">
      {children}
      <View style={`position:absolute;width:100%;height:100%;top:0px;left:0px;background:#fff;${style}`}>
        <Text style="display:block;margin:0 auto;text-align:center;position:relative;top:50%;margin-top:-10px;font-size:12px;color:#999;">
          加载中...
        </Text>
      </View>
    </View>
  );
};

export default Loading;

export const PopupLoading = ({ loading = true }) => {
  return (
    <Loading style="background: transparent;">
      <View style="background:#fff;margin:0 8px;margin-bottom:6px;border-radius:13px;padding:10px 16px;height:80px;" />
    </Loading>
  );
};
