import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';

import './Index.scss';
import { PanoViewer } from './components/PanoViewer';
export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };
  state = {
    pano: {
      faces: {
        front: {
          img: 'https://s.cdpn.io/19243/front.JPG'
        },
        left: {
          img: 'https://s.cdpn.io/19243/left.JPG'
        },
        right: {
          img: 'https://s.cdpn.io/19243/right.JPG'
        },
        back: {
          img: 'https://s.cdpn.io/19243/back.JPG'
        },
        bottom: {
          img: 'https://s.cdpn.io/19243/bottom.JPG'
        },
        top: {
          img: 'https://s.cdpn.io/19243/top.JPG'
        }
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <PanoViewer
          renderFront={
            <Image
              className='red'
              style='width:100%;height:100%'
              src='https://s.cdpn.io/19243/front.JPG'
            />
          }
          renderLeft={
            <Image
              style='width:100%;height:100%'
              src='https://s.cdpn.io/19243/left.JPG'
            />
          }
          renderRight={
            <Image
              style='width:100%;height:100%'
              src='https://s.cdpn.io/19243/right.JPG'
            />
          }
          renderBack={
            <Image
              style='width:100%;height:100%'
              src='https://s.cdpn.io/19243/back.JPG'
            />
          }
          renderTop={
            <Image
              style='width:100%;height:100%'
              src='https://s.cdpn.io/19243/up.JPG'
            />
          }
          renderBottom={
            <View style='width:100%;height:100%;position:relative;'>
              <View style='position:absolute;left:10%;top:10%;height:20%;width:20%;background:red;' />
              <Image
                style='width:100%;height:100%'
                src='https://s.cdpn.io/19243/down.JPG'
              />
            </View>
          }
        />
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
