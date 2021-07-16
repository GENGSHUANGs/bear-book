import { useState, useEffect, cloneElement, Children, createContext, useContext, useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import cx from 'classnames';
import './layout.scss';

import Button, { ImageIcon } from './button.js';
import { useSelector } from 'react-redux';

const { screenHeight, safeArea } = Taro.getSystemInfoSync();
export const ContentScrollView = ({
  children,
  withoutPaceholder = false,
  style,
  className,
  scrollY = true,
  enableFlex = false,
  onScroll,
  onScrollToLower,
}) => {
  return (
    <ScrollView
      scrollY={scrollY}
      scrollWithAnimation={true}
      className={cx('wh-layout-main-content', className)}
      style={`${style || ''}`}
      enableFlex={enableFlex}
      onScroll={onScroll}
      onScrollToLower={onScrollToLower}
    >
      {withoutPaceholder ? null : (
        <View
          className="wh-layout-main-content-placeholder"
          style={`box-sizing:border-box;padding-top:${safeArea.top + 40}px;`}
        />
      )}
      {children}
    </ScrollView>
  );
};

export const ContentView = ({ children, withoutPaceholder = false, style, className }) => {
  return (
    <View className={cx('wh-layout-main-content', className)} style={`${style || ''}`}>
      {withoutPaceholder ? null : (
        <View
          className="wh-layout-main-content-placeholder"
          style={`box-sizing:border-box;padding-top:${safeArea.top + 40}px;`}
        />
      )}
      {children}
    </View>
  );
};

export default ({ background, titleBar, children }) => {
  const { popupViews } = usePopup();
  return (
    <View className="wh-layout" style="background:#fdfdfd;">
      {background && <View className="wh-layout-background">{background}</View>}
      {titleBar && cloneElement(titleBar, { className: cx(titleBar.props.className, 'wh-layout-title-bar') })}
      {children}
      {popupViews.length > 0 ? popupViews[popupViews.length - 1] : null}
    </View>
  );
};

export const TabLayout = ({ children }) => (
  <View style="display:flex;flex-direction:column;height:100vh;width:100vw;">{children}</View>
);

export const TabLayoutContent = ({ children }) => (
  <View style={`box-sizing:border-box;flex:1;padding-top:${safeArea.top + 40}px;`}>{children}</View>
);

export const TabBar = ({ style, children }) => (
  <View
    style={`height:${
      screenHeight - safeArea.bottom + 56
    }px;display:flex;flex-direction:row;justify-content: space-around;${style || ''};`}
  >
    {children}
  </View>
);

export const TabBarItem = ({ icon, title, children, onClick }) => (
  <View onClick={onClick} style="position:relative;height:56px;width:25%;">
    <Image src={icon} style="width:26px;height:26px;position:relative;left:50%;margin-left:-13px;margin-top:6px;" />
    {title ? <Text style="display:block;text-align:center;font-size:12px;color:#555;">{title}</Text> : children}
  </View>
);

// 弹窗 ---------------------------
export const PopupView = ({ children, background }) => (
  <View style="height:100vh;width:100vw;position:absolute;left:0px;top:0px;z-index:99;">
    {background}
    <View style="width:100vw;position:absolute;left:0px;bottom:0px;z-index:1;">{children}</View>
  </View>
);

/** 弹窗蒙层 */
export const PopupMask = () => {
  const { close } = usePopup();
  return <View onClick={close} style="width:100vw;height:100vh;background:rgba(0,0,0,.2);" />;
};

export const PopupContentLayout = ({ children }) => (
  <View style="position:relative;overflow:hidden;">
    <View style="width:100vw;height:100vh;position:absolute;left:0px;top:0px;z-index:-1;">
      <View style="height:50px;background: linear-gradient(rgba(248,248,248,0), rgba(248,248,248,100));" />
      <View style="background:#f8f8f8;height:100vh;" />
    </View>
    <View style={`padding-bottom:${screenHeight - safeArea.bottom}px;z-index:2;`}>{children}</View>
  </View>
);

export const PopupCloseButton = () => {
  const { close } = usePopup();
  const onClickHandler = useCallback(async () => close());
  return (
    <Button onClick={onClickHandler} style="position: absolute;right: 8px;top: -42px;">
      <ImageIcon src={require('./icon-close-48.png')} />
    </Button>
  );
};

export const PopupCancelButton = ({ children }) => {
  const { close } = usePopup();
  return (
    <Button
      onClick={close}
      style="display:block;height:50px;line-height:50px;margin:6px 8px;text-align:center;font-size:18px;color:#333;background: transparent;"
    >
      {children || '取消'}
    </Button>
  );
};

export const PopupEmpty = ({ children }) => {
  return (
    <View style="background:#fff;margin:0 8px;margin-bottom:6px;border-radius:13px;padding:10px 16px;height:80px;">
      {children || <Text style="font-size:12px;color:#777;">暂无数据</Text>}
    </View>
  );
};

export const PopupContext = createContext({
  popupViews: undefined,
  setPopupViews(popupViews) {},
  // 弹窗
  popupView(view, clean = false) {},
  // 关闭弹窗(clean=true则清空所有弹窗)
  close(clean = false) {},
  // 清空弹窗
  clean() {},
  popupModal(view, clean = false) {},
});

// Hook
export const usePopup = () => {
  const context = useContext(PopupContext);
  return {
    ...context,
  };
};
