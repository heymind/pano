import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

export class Container extends Component {
  static options = {
    addGlobalClass: true
  };

  render() {
    return <View>{this.props.children}</View>;
  }
}
