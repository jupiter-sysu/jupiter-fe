import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer, } from 'mobx-react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PIXEL_RATE = Dimensions.get('screen').width / 375;
const PIXEL_RATE_Y = Dimensions.get('screen').height / 667;

@inject(stores => ({
    experience: stores.experience
}))
@observer
class Experience extends Component {

    componentDidMount() {
        // 请求资源

    }

    render() {
        console.log(this.props.navigation);
        return (
            <View style={styles.container}>
                <View style={styles.Headercontainer}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('hi', this.props.navigation.goBack);
                            this.props.navigation.goBack();
                        }}
                        style={styles.backIcon}
                    >
                        <Ionicons name='ios-arrow-back' size={20 * PIXEL_RATE} style={{ marginTop: 2, color: 'black', backgroundColor: 'rgba(0,0,0,0)' }} />
                    </TouchableOpacity>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.props.experience.setCurrentTab(1);
                            }}
                            style={this.props.experience.currentTab === 1 ?
                            styles.activeTabButton
                            : styles.inactiveTabButton}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: 'white'
                            }}>体验</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => {
                                this.props.experience.setCurrentTab(2);
                            }}
                            style={this.props.experience.currentTab === 2 ?
                            styles.activeTabButton
                            : styles.inactiveTabButton}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: 'white'
                            }}>点评</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text>{`体验:${this.props.experience.currentExperienceID}`}</Text>
            </View>
        )
    }
}

export default Experience;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Headercontainer: {
        height: 32 * PIXEL_RATE,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: 28 * PIXEL_RATE_Y,
    },
    backIcon: {
        position: 'absolute',
        left: 16 * PIXEL_RATE,
        width: 40 * PIXEL_RATE,
        alignItems: 'center',
        height: 30 * PIXEL_RATE,
    },
    optionContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 16 * PIXEL_RATE + 40 * PIXEL_RATE,
        paddingRight: (16 * PIXEL_RATE + 40 * PIXEL_RATE) / 2,
    },
    activeTabButton: {
        width: 75,
        height: 36,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    inactiveTabButton: {
        width: 75,
        height: 36,
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
    }

});

