import { Component, useState, useEffect, useCallback, cloneElement, Children } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, ScrollView, Text, Image, Canvas, Input } from '@tarojs/components';
import cx from 'classnames';
import F2Canvas from './F2Canvas.js';
const F2 = require('@antv/f2/lib/core');
require('@antv/f2/lib/geom/line'); // 只加载折线图
// 第一步：加载插件 Tooltip
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
// 第二步：注册插件 Tooltip
F2.Chart.plugins.register(Tooltip); // 这里进行全局注册，也可以给 chart 的实例注册
require('@antv/f2/lib/geom/line'); // 只加载折线图
require('@antv/f2/lib/geom/point'); // 只加载点图

export const RevenueHistoryChartBox = ({ id, datas, style }) => {
  const onInitChart = useCallback((config) => {
    const chart = new F2.Chart(config);
    const data = datas.map((data) => ({ date: data.get('title'), value: data.get('hmValue') })).toJS();
    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0,
      },
      date: {
        type: 'cat',
        tickCount: 7,
      },
    });
    console.log(data);
    chart.tooltip({
      custom: true,
      showXTip: false,
      showYTip: false,
      snap: true,
      crosshairsType: 'y',
      crosshairsStyle: {
        lineDash: [2],
      },
    });
    chart.axis('value', false);
    chart.axis('date', {
      label: false,
      line: {
        lineWidth: 1,
        stroke: '#999',
      },
      grid: (text, index, total) => {
        if (index === total - 1) {
          return {
            lineWidth: 8,
            stroke: '#ccc',
            lineDash: [],
          };
        }
        return {
          lineWidth: 2,
          stroke: '#ccc',
          lineDash: [],
        };
      },
    });
    chart.line().position('date*value');
    chart.point().position('date*value').style({
      fill: '#5B8FF9',
      stroke: '#fff',
      lineWidth: 2,
    });
    chart.render();
    return chart;
  });
  return (
    <View style={`${style || ''};`}>
      <F2Canvas id={id} class="f2-chart" style="width:100%;height:100px;" onInit={onInitChart} />
    </View>
  );
};

export const RevenueRedlineChartBox = ({ style }) => {
  const datas = useSelector((state) =>
    state.getIn(['partner', 'currentShopSummary', 'revenueLmit', 'recentHistoryInHours', 'datas']),
  );
  return (
    <View onClick={() => Taro.navigateTo({ url: './revenue-redline' })} style={`${style || ''};`}>
      <Text style="font-size:12px;color:#777">营收红线(日目标)</Text>
      {datas && <RevenueHistoryChartBox id="revenue-redline-chart-box" datas={datas} />}
    </View>
  );
};

export const RevenueTargetChartBox = ({ style }) => {
  const datas = useSelector((state) =>
    state.getIn(['partner', 'currentShopSummary', 'revenueTarget', 'recentHistoryInHours', 'datas']),
  );
  return (
    <View onClick={() => Taro.navigateTo({ url: './revenue-target' })} style={`${style || ''};`}>
      <Text style="font-size:12px;color:#777">营收目标(日目标)</Text>
      {datas && <RevenueHistoryChartBox id="revenue-target-chart-box" datas={datas} />}
    </View>
  );
};

export const RevenueRedlineStatsChartBox = ({ id, datas, style }) => {
  const onInitChart = useCallback((config) => {
    const chart = new F2.Chart(config);
    console.log(datas, datas.toJS && datas.toJS());
    const data = datas.map((data) => ({ date: data.get('time'), value: data.get('hmAmount') })).toJS();
    console.log(data);
    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0,
      },
      date: {
        type: 'cat',
      },
    });
    chart.tooltip({
      custom: true,
      showXTip: false,
      showYTip: false,
      snap: true,
      crosshairsType: 'y',
      crosshairsStyle: {
        lineDash: [2],
      },
    });
    // chart.axis('value', false);
    chart.axis('date', {
      // label: false,
      line: {
        lineWidth: 1,
        stroke: '#999',
      },
      grid: (text, index, total) => {
        if (index === total - 1) {
          return {
            lineWidth: 8,
            stroke: '#ccc',
            lineDash: [],
          };
        }
        return {
          lineWidth: 2,
          stroke: '#ccc',
          lineDash: [],
        };
      },
    });
    chart.line().position('date*value');
    chart.point().position('date*value').style({
      fill: '#5B8FF9',
      stroke: '#fff',
      lineWidth: 2,
    });
    chart.render();
    return chart;
  });
  return (
    <View style={`${style || ''};`}>
      <F2Canvas id={id} class="f2-chart" style="width:100%;height:100%;" onInit={onInitChart} />
    </View>
  );
};
