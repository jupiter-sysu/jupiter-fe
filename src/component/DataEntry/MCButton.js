import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
const PIXEL_RATE = Dimensions.get('screen').width / 375;

// 按钮
// =========
// porps说明
// >width:Number,宽度
// >height:Number,高度
// >mainColor:String,按钮的主色
// >color:String,字体的颜色
// >size:Number,字体的大小
// >outline:Boolean,选择true如果是只有外轮廓，选择false如果是底色填充。
// >handler:Function,事件处理器
// >clickable:boolean,是否可以点击

function MCButton(props) {
    const { width, height, mainColor='#fff', color='balck', size=20 * PIXEL_RATE, outline=false, handler, children="按钮", clickable=true } = props;
    if (outline === true) {
        return (
            <TouchableOpacity
                onPress={handler}
                disabled={!clickable}
                style={{ width: width, height: height, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderRadius: 6, borderColor: mainColor }}
            >
                <Text style={{ color: color, fontSize: size, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0)' }}>{children}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity
                onPress={handler}
                disabled={!clickable}
                style={{ width: width, height: height, backgroundColor: clickable ? mainColor : '#ccc', borderRadius: 6, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: color, fontSize: size, textAlign: 'center',}}>{children}</Text>
            </TouchableOpacity>
        )
    }
}

export default MCButton;

