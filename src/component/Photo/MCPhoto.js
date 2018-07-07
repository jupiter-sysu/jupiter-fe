import React, {Component} from 'react';
import { Image, Modal, View, TouchableOpacity } from 'react-native';
import PhotoView from 'react-native-photo-view';

class MCPhoto extends Component {
    state={
        showModal: false,
    }
    render() {
        const { style, uri, containerStyle } = this.props;
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[containerStyle]}
                    onPress={(e) => this.setState({showModal: true})}
                >
                    <Image
                        style={[style]}
                        source={{ uri }}
                    />
                </TouchableOpacity>
                
                <Modal 
                    animationType="none"
                    // transparent
                    visible={this.state.showModal}
                >
                    <PhotoView
                        source={{ uri }}
                        minimumZoomScale={0.5}
                        maximumZoomScale={3}
                        androidScaleType="center"
                        onTap={() => this.setState({ showModal: false })}
                        style={{width: 375, height: 667}}
                    />
                </Modal>
            </View>
        )
    }
}

export default MCPhoto;