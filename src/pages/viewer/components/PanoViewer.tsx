import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './PanoViewer.scss';
import { Container } from './Container';

// export interface PanoViewerProps {
//   pieceRadius: number;
//   overlapOffset: number;
//   faces: {
//     front: FaceProps;
//     left: FaceProps;
//     right: FaceProps;
//     back: FaceProps;
//     top: FaceProps;
//     bottom: FaceProps;
//   };
// }
// export interface PanoViewerStates {}

export class PanoViewer extends Component<any> {
  //   static defaultProps: Partial<PanoViewerProps> = {
  //     pieceRadius: 1000,
  //     overlapOffset: 0
  //   };
  x1 = 0;
  x2 = 0;
  y1 = 0;
  y2 = 0;
  deviceWidth = 750;
  deviceHeight = 1200;
  cXDeg = 0;
  cYDeg = 0;
  perspective = 1000;
  moving = false;
  state = {
    degX: 0,
    degY: 0,
    scale: 1
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props.render, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onTouchStart(e) {
    this.x1 = e.changedTouches[0].clientX;
    this.y1 = e.changedTouches[0].clientY;
    this.moving = true;
  }
  onTouchEnd(e) {
    this.moving = false;
  }
  onTouchMove(e) {
    console.log(1);
    if (this.moving) {
      const x1 = this.x1,
        y1 = this.y1;
      const y2 = e.changedTouches[0].clientY;
      const x2 = e.changedTouches[0].clientX;
      const dist_x = (x2 - x1) * 4,
        dist_y = (y2 - y1) * 4,
        deg_x = (Math.atan2(dist_y, this.perspective) / Math.PI) * 180,
        deg_y = (-Math.atan2(dist_x, this.perspective) / Math.PI) * 180;

      this.cXDeg += deg_x;
      this.cYDeg += deg_y;
      this.cXDeg = Math.min(90, this.cXDeg);
      this.cXDeg = Math.max(-90, this.cXDeg);

      this.cYDeg %= 360;

      this.setState({ degX: this.cXDeg, degY: this.cYDeg });
      this.x1 = x2;
      this.y1 = y2;
    }
  }
  render() {
    return (
      <View
        className='pano-viewer'
        onTouchStart={this.onTouchStart.bind(this)}
        onTouchMove={this.onTouchMove.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
      >
        <View
          className='pano-cube-box'
          style={`scale:${this.state.scale} ${this.state.scale};`}
        >
          <View
            className='pano-cube'
            style={`transform: rotateX(${this.state.degX}deg) rotateY(${
              this.state.degY
            }deg);`}
          >
            <Container>
              <View className='pano-face pano-front'>
                {this.props.renderFront}
              </View>
              <View className='pano-face pano-left'>
                {this.props.renderLeft}
              </View>
              <View className='pano-face pano-right'>
                {this.props.renderRight}
              </View>
              <View className='pano-face pano-back'>
                {this.props.renderBack}
              </View>
              <View className='pano-face pano-top'>{this.props.renderTop}</View>
              <View className='pano-face pano-bottom'>
                {this.props.renderBottom}
              </View>
            </Container>
          </View>
        </View>
      </View>
    );
  }
}
