import Taro, { Component, Config } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './PanoViewer.scss';
import { Container } from './Container';
import AlloyFinger from '../../../alloy_finger';
import debounce from 'lodash/debounce';
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
  af: any = null;
  initScale = 1;
  state = {
    degX: 0,
    degY: 0,
    scale: 1
  };
  componentWillReceiveProps(nextProps) {
    console.log(this.props.render, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {
    this.af = new AlloyFinger(null, {
      touchStart: function() {},
      touchMove: function() {},
      touchEnd: function() {},
      touchCancel: function() {},
      multipointStart: () => {
        this.initScale = this.state.scale;
      },
      multipointEnd: function() {},
      tap: function() {},
      doubleTap: function() {},
      longTap: function() {},
      singleTap: function() {},
      rotate: evt => {
        // console.log(evt.angle);
      },
      pinch: evt => {
        // if (evt.zoom < 1) {
        const zoom = this.initScale * evt.zoom;
        if (zoom > 0.7 && zoom < 3) this.setState({ scale: zoom });

        console.log('pinch', evt.zoom);
      },
      pressMove: evt => {
        const dist_x = evt.deltaX * 4,
          dist_y = evt.deltaY * 4,
          deg_x = (Math.atan2(dist_y, this.perspective) / Math.PI) * 180,
          deg_y = (-Math.atan2(dist_x, this.perspective) / Math.PI) * 180;

        this.cXDeg += deg_x;
        this.cYDeg += deg_y;
        this.cXDeg = Math.min(90, this.cXDeg);
        this.cXDeg = Math.max(-90, this.cXDeg);

        this.cYDeg %= 360;

        this.setState({ degX: this.cXDeg, degY: this.cYDeg });
      },
      swipe: function(evt) {
        // console.log('swipe' + evt.direction);
      }
    });
  }

  componentDidHide() {}

  onTouchStart(e) {
    this.af.start(e);
  }
  onTouchEnd(e) {
    this.af.end(e);
  }
  onTouchMove(e) {
    this.af.move(e);
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
          style={`transform: scale(${this.state.scale});`}
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
