import { Component, useState, useCallback, useEffect, cloneElement, Children } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cx from 'classnames';

import './button.scss';

export const ImageIcon = ({ src, style }) => <Image src={src} className="wh-button-image-icon" style={style} />;

const Button = ({ onClick, icon, children, className, style }) => {
  return (
    <View className={cx('wh-button', className)} onClick={onClick} style={style}>
      {icon}
      {children}
    </View>
  );
};

export default Button;
