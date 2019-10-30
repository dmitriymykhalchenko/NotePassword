import { Dimensions, Platform } from 'react-native'
export const SERIALIZE_STATE_INTERVAL = 1000

export const win = Dimensions.get('window')
export const w = win.width
export const h = win.height


export function isIphoneX() {
    let dimen = Dimensions.get('window');

    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height / dimen.width > 2 || dimen.height / dimen.width < 0.5)
    );
}
