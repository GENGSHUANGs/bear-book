import { Component, useState, useEffect, cloneElement, Children, useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import cx from 'classnames';

const ListView = ({ children, style, className }) => {
  return (
    <View className={cx('wh-list-view', className)} style={style}>
      {children}
    </View>
  );
};

export const ScrollLoadingView = ({ loadMore, loading = false, hasMore = true, children }) => {
  const onScrollToLowerHandler = useCallback(({ detail }) => {
    if (!hasMore || loading) {
      return;
    }
    loadMore && loadMore();
  });
  return (
    <ScrollView
      style="height:100%;background:#red;"
      scrollY={true}
      scrollWithAnimation={true}
      onScrollToLower={onScrollToLowerHandler}
    >
      {children}
      <ScrollLoadingButton {...{ loading, hasMore }} onClick={() => loadMore && loadMore()} />
    </ScrollView>
  );
};

export const ScrollLoadingButton = ({ loading = false, hasMore = true, onClick }) => {
  return (
    <View
      onClick={() => {
        if (loading) {
          return;
        }
        onClick && onClick();
      }}
      style="height:45px;"
    >
      <Text style="line-height:45px;display:block;width:100%;text-align:center;font-size:12px;color:#777;">
        {(() => {
          if (!hasMore) {
            return '没有更多数据！';
          }
          if (loading) {
            return '加载数据中…';
          }
          return '点击查看更多…';
        })()}
      </Text>
    </View>
  );
};

export const Group = ({ children, className, style }) => (
  <View className={cx('wh-list-view-group', className)} style={style}>
    {children}
  </View>
);

export const GroupTitle = ({ children, className, style, title }) => (
  <View className={cx('wh-list-view-gropu-title', className)} style="padding:0 24px;height:31px;margin-top:6px;">
    <Text style="font-size:12px;line-height:31px;color:#777;">{title || children}</Text>
  </View>
);

export default ListView;

export const SeparatorLine = ({ style }) => (
  <View style={`border-bottom: 1px dashed #ddd;margin:9px 7px;${style || ''};`} />
);

export const StandardList = ({ children, style }) => <View style={style}>{children}</View>;

export const StandardItem = ({ onClick, title, children }) => (
  <View onClick={onClick} style="height:45px;position:relative;margin:0 7px;">
    {title}
    <View style="display:inline-block;position:absolute;right:0px;height:45px;margin-right:13px;">{children}</View>
  </View>
);

export const StandardItemTitle = ({ children, bold = false }) => (
  <Text style={`margin-left:13px;font-size:18px;color:#111;line-height:45px;font-weight:${bold ? 'bold' : 'normal'};`}>
    {children}
  </Text>
);

export const StandardItemDescription = ({ children, style }) => (
  <Text style={`font-size:12px;line-height:45px;color:#777;${style || ''};`}>{children}</Text>
);

export const StandardItemArrow = () => (
  <Image src={require('./icon-arrow-right-48.png')} style="width:24px;height:24px;position:relative;top:7px;" />
);
