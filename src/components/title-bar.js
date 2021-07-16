import { Component, useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Input, Image, Checkbox } from '@tarojs/components';
import cx from 'classnames';
import './title-bar.scss';

import Button, { ImageIcon } from './button.js';

/** 后退按钮 */
export const BackButton = ({ url, delta }) => {
  return (
    <Button
      className={cx('wh-title-bar-back-button')}
      onClick={() =>
        url
          ? Taro.redirectTo({
              url,
            })
          : Taro.navigateBack({ delta })
      }
    >
      <ImageIcon src={require('./icon-back-48.png')} />
    </Button>
  );
};

export const ProfileButton = ({ showShareForFree }) => (
  <Button
    className={cx('wh-title-bar-back-button')}
    onClick={() =>
      Taro.navigateTo({
        url: '/pages/profile',
        events: {
          showShareForFree,
        },
      })
    }
  >
    <ImageIcon src={require('./icon-profile.png')} />
  </Button>
);

/** 标题 */
export const Title = ({ children }) => <Text className="wh-title-bar-title">{children}</Text>;

/** 搜索框 */
export const SearchInput = ({ value, placeholder, onClick, onInput, onConfirm, focus = false, disabled = false }) => {
  return (
    <View
      style="position:relative;display:inline-block;height:32px;border-radius:13px;background:#fff;padding:0 8px;margin-left: 6px;margin-top: 4px;"
      onClick={onClick}
    >
      <Image
        src={require('./icon-search.png')}
        style="width:16px;height:16px;display:inline-block;position:relative;top:-8px;"
      />
      <Input
        focus={focus}
        disabled={disabled}
        placeholder={placeholder}
        style="font-size:12px;color:#999;display:inline-block;width:120px;height:32px;line-height:32px;background:#fff;margin-left:2px;"
        onInput={onInput}
        confirmType="search"
        onConfirm={onConfirm}
      />
    </View>
  );
};

/** 切换组件 */
export const SwitchTitle = ({ placeholder, onClick, focus = false, disabled = false, children }) => {
  return (
    <View
      style="position:relative;display:inline-block;height:32px;border-radius:13px;background:#fff;padding:0 12px;margin-left: 6px;margin-top: 4px;background:#EEEEEE;"
      onClick={onClick}
    >
      <Text style="font-size:12px;color:#111;height:12px;line-height:12px;position:relative;top:-2px;">{children}</Text>
      <Image
        src={require('./icon-arrow-down-48.png')}
        style="width:24px;height:24px;display:inline-block;position:relative;top:8px;position:relative;top:5px;margin-left:2px;"
      />
    </View>
  );
};

const { safeArea = { top: 0 } } = Taro.getSystemInfoSync();
console.log('Taro.getSystemInfoSync():', Taro.getSystemInfoSync());
/** TitleBar */
export default ({ className, children }) => {
  return (
    <View
      className={cx(className, 'at-row', 'wh-title-bar')}
      style={`padding-top:${safeArea.top}px;height:${safeArea.top + 40}px;`}
    >
      {children}
    </View>
  );
};
