import { TouchableOpacity, Pressable, Text } from 'react-native'
import { styles } from '../../styles/AppRootStyle'
import React from 'react'

const ThemeButton = (props) => {
    const color = props.color;
    const text = props.text;
    let width = props?.width === 'smaller' ? 230 : 275;


    /* Tätä voi käyttää missä ikinä tarviikaan:
    <ThemeButton width='smaller' color="#F4247C" text='Kotinäkymään' />

    Width ei ole pakollinen, renderöi silloin leveämmän buttonin
    */

    return (
        <Pressable>
            <TouchableOpacity
                style={[styles.button, styles.boxShadow, { backgroundColor: color, width: width }]}
            >
                <Text style={[styles.upperCase, styles.h3]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </Pressable>
    )
}

export default ThemeButton