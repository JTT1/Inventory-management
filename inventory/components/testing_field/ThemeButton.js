import { TouchableOpacity, Text } from 'react-native'
import { styles } from '../../styles/AppRootStyle'
import React from 'react'

const ThemeButton = React.forwardRef((props, ref) => {
    const color = props.color;
    const text = props.text;
    const width = props?.width === 'small' ? 230 : 275;
    const onPress = props.onPress;
    const disabled = props.disabled;

    /* Tätä voi käyttää missä ikinä tarviikaan:
    <ThemeButton width='small' color="#F4247C" text='Kotinäkymään' />

    Width ei ole pakollinen, renderöi silloin leveämmän buttonin
    */

    return (
        <TouchableOpacity ref={ref} {...props}
            style={[styles.button, styles.boxShadow, disabled ? styles.buttonDisabled : "", { backgroundColor: color, width: width }, props.style]}
            >
                <Text style={[styles.upperCase, styles.h3]}>
                    {text}
                </Text>
        </TouchableOpacity>
    )
});

export default ThemeButton;