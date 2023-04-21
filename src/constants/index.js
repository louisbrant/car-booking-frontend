import { StyleSheet } from "react-native"
import normalize from 'react-native-normalize'
import { COLOR } from "./Color"
import { LAYOUT } from "./Layout"
export * from './Color'
export * from './Images'
export * from './Layout'
export * from './Root'
export * from './Profile'

/**
 * basic styles
 */
export const Styles = StyleSheet.create({
    /**
     * Sign in and Sign up 
     */
    linearGradient: {
        height: '100%',
    },
    orText: {
        color: COLOR.textColor1,
        fontSize: normalize(14),
        textAlign: 'center',
        fontWeight: '400',
    },
    rightIcon: {
        color: COLOR.white,
        fontSize: normalize(22),
        paddingLeft: normalize(10),
    },
    inputCover: {
        borderColor: COLOR.inputBorberColor,
        marginTop: normalize(15),
    },
    inputIcon: {
        color: COLOR.inputIconColor,
        fontSize: normalize(20),
        paddingVertical: normalize(10),
    },
    label: {
        textTransform: 'uppercase',
        fontSize: normalize(16),
        color: COLOR.inputLabelColor,
    },
    authButtonText: {
        color: COLOR.white,
        fontSize: normalize(16),
        fontWeight: '700',
        textAlign: 'center',
    },
    authButton: {
        paddingHorizontal: normalize(20),
        paddingVertical: normalize(10),
        borderRadius: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIcon: {
        color: COLOR.white,
        fontSize: normalize(22),
        paddingLeft: normalize(10),
    },
    signWithButton: {
        borderRadius: normalize(10),
        marginHorizontal: normalize(10),
        paddingHorizontal: normalize(50),
        paddingVertical: normalize(10),
        backgroundColor: COLOR.primary
    },
    FooterLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -normalize(25),
        width: normalize(70),
        height: normalize(70),
        borderRadius: normalize(40),
        backgroundColor: COLOR.base,
        shadowColor: COLOR.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3
    },
    BoxShadow: {
        shadowColor: COLOR.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 3
    },
    TDL: {
        textDecorationLine: 'underline'
    },
    Hidden: {
        overflow: 'hidden'
    },

    container: {
        padding: LAYOUT.window.width * 0.1,
        paddingHorizontal: LAYOUT.window.width * 0.15,
        alignItems: 'center',
    },
    linearGradient: {
        height: '100%',
    },
    image: {
        width: normalize(80),
        height: normalize(80),
        resizeMode: 'contain',
    },
    image1: {
        width: normalize(100),
        height: normalize(100),
        resizeMode: 'contain',
    },
    OsignIcon: {
        width: normalize(25),
        height: normalize(25),
        resizeMode: 'contain',
    },
    FooterIcon: {
        width: normalize(24),
        height: normalize(24),
        resizeMode: 'contain',
    },
    Logo: {
        width: normalize(35),
        height: normalize(35),
        resizeMode: 'contain',
    },

    /**
     * Align
     */
    Tcenter: {
        textAlign: 'center'
    },
    Tleft: {
        textAlign: 'left'
    },
    Tright: {
        textAlign: 'right'
    },
    ROW: {
        flexDirection: 'row'
    },
    Column: {
        flexDirection: 'column'
    },
    Wrap: {
        flexWrap: 'wrap'
    },
    Jbetween: {
        justifyContent: 'space-between'
    },
    Jaround: {
        justifyContent: 'space-around'
    },
    Jcenter: {
        justifyContent: 'center'
    },
    Jstart: {
        justifyContent: 'flex-start'
    },
    Jend: {
        justifyContent: 'flex-end'
    },
    AScenter: {
        alignSelf: 'center'
    },
    ASend: {
        alignSelf: 'flex-end'
    },
    Acenter: {
        alignItems: 'center'
    },
    Astart: {
        alignItems: 'flex-start'
    },
    Aend: {
        alignItems: 'flex-end'
    },

    PABS: {
        position: 'absolute'
    },

    /**
     * fontWeight
     */
    FW400: {
        fontWeight: '400'
    },
    FW700: {
        fontWeight: '700'
    },
    FWBold: {
        fontWeight: 'bold'
    },

    /**
     * fontSize
     */
    F12: {
        fontSize: normalize(12)
    },
    F13: {
        fontSize: normalize(13)
    },
    F14: {
        fontSize: normalize(14)
    },
    F15: {
        fontSize: normalize(15)
    },
    F16: {
        fontSize: normalize(16)
    },
    F17: {
        fontSize: normalize(17)
    },
    F18: {
        fontSize: normalize(18)
    },
    F19: {
        fontSize: normalize(19)
    },
    F20: {
        fontSize: normalize(20)
    },
    F21: {
        fontSize: normalize(21)
    },
    F22: {
        fontSize: normalize(22)
    },
    F23: {
        fontSize: normalize(23)
    },
    F24: {
        fontSize: normalize(24)
    },
    F25: {
        fontSize: normalize(25)
    },
    F26: {
        fontSize: normalize(26)
    },
    F27: {
        fontSize: normalize(27)
    },
    F28: {
        fontSize: normalize(28)
    },
    F30: {
        fontSize: normalize(30)
    },
    F35: {
        fontSize: normalize(35)
    },
    F40: {
        fontSize: normalize(40)
    },
    F70: {
        fontSize: normalize(70)
    },

    /**
     * margin
     */
    M0: {
        margin: 0
    },
    M5: {
        margin: normalize(5)
    },
    M10: {
        margin: normalize(10)
    },
    M20: {
        margin: normalize(20)
    },
    M30: {
        margin: normalize(30)
    },
    M40: {
        margin: normalize(40)
    },
    M50: {
        margin: normalize(50)
    },

    MT5: {
        marginTop: normalize(5)
    },
    MT10: {
        marginTop: normalize(10)
    },
    MT15: {
        marginTop: normalize(15)
    },
    MT20: {
        marginTop: normalize(20)
    },
    MT25: {
        marginTop: normalize(25)
    },
    MT30: {
        marginTop: normalize(30)
    },
    MT40: {
        marginTop: normalize(40)
    },
    MT50: {
        marginTop: normalize(50)
    },

    MB10: {
        marginBottom: normalize(10)
    },
    MB20: {
        marginBottom: normalize(20)
    },
    MB30: {
        marginBottom: normalize(30)
    },
    MB40: {
        marginBottom: normalize(40)
    },
    MB50: {
        marginBottom: normalize(50)
    },
    MB60: {
        marginBottom: normalize(60)
    },
    MB70: {
        marginBottom: normalize(70)
    },

    MV5: {
        marginVertical: normalize(5)
    },
    MV10: {
        marginVertical: normalize(10)
    },
    MV10: {
        marginVertical: normalize(10)
    },
    MV15: {
        marginVertical: normalize(15)
    },
    MV20: {
        marginVertical: normalize(20)
    },
    MV30: {
        marginVertical: normalize(30)
    },
    MV40: {
        marginVertical: normalize(40)
    },
    MV50: {
        marginVertical: normalize(50)
    },

    MH5: {
        marginHorizontal: normalize(5)
    },
    MH10: {
        marginHorizontal: normalize(10)
    },
    MH20: {
        marginHorizontal: normalize(20)
    },
    MH30: {
        marginHorizontal: normalize(30)
    },
    MH40: {
        marginHorizontal: normalize(40)
    },
    MH50: {
        marginHorizontal: normalize(50)
    },

    MR10: {
        marginRight: normalize(10)
    },
    MR20: {
        marginRight: normalize(20)
    },
    MR30: {
        marginRight: normalize(30)
    },
    MR40: {
        marginRight: normalize(40)
    },
    MR50: {
        marginRight: normalize(50)
    },

    ML10: {
        marginLeft: normalize(10)
    },
    ML15: {
        marginLeft: normalize(15)
    },
    ML20: {
        marginLeft: normalize(20)
    },
    ML30: {
        marginLeft: normalize(30)
    },
    ML40: {
        marginLeft: normalize(40)
    },
    ML50: {
        marginLeft: normalize(50)
    },

    /**
     * padding
     */
    P5: {
        padding: normalize(5)
    },
    P10: {
        padding: normalize(10)
    },
    P15: {
        padding: normalize(15)
    },
    P20: {
        padding: normalize(20)
    },
    P30: {
        padding: normalize(30)
    },

    PT5: {
        paddingTop: normalize(5)
    },
    PT10: {
        paddingTop: normalize(10)
    },
    PT15: {
        paddingTop: normalize(15)
    },
    PT20: {
        paddingTop: normalize(20)
    },
    PT25: {
        paddingTop: normalize(25)
    },
    PT30: {
        paddingTop: normalize(30)
    },
    PT40: {
        paddingTop: normalize(40)
    },
    PT50: {
        paddingTop: normalize(50)
    },

    PB5: {
        paddingBottom: normalize(5)
    },
    PB10: {
        paddingBottom: normalize(10)
    },
    PB20: {
        paddingBottom: normalize(20)
    },
    PB30: {
        paddingBottom: normalize(30)
    },
    PB40: {
        paddingBottom: normalize(40)
    },
    PB50: {
        paddingBottom: normalize(50)
    },

    PL5: {
        paddingLeft: normalize(5)
    },
    PL10: {
        paddingLeft: normalize(10)
    },
    PL20: {
        paddingLeft: normalize(20)
    },
    PL25: {
        paddingLeft: normalize(25)
    },
    PL30: {
        paddingLeft: normalize(30)
    },

    PR10: {
        paddingRight: normalize(10)
    },
    PR20: {
        paddingRight: normalize(20)
    },
    PR50: {
        paddingRight: normalize(50)
    },

    PV5: {
        paddingVertical: normalize(5)
    },
    PV10: {
        paddingVertical: normalize(10)
    },
    PV15: {
        paddingVertical: normalize(15)
    },
    PV20: {
        paddingVertical: normalize(20)
    },

    PH5: {
        paddingHorizontal: normalize(5)
    },
    PH10: {
        paddingHorizontal: normalize(10)
    },
    PH15: {
        paddingHorizontal: normalize(15)
    },
    PH20: {
        paddingHorizontal: normalize(20)
    },
    PH25: {
        paddingHorizontal: normalize(25)
    },
    PH30: {
        paddingHorizontal: normalize(30)
    },
    PH35: {
        paddingHorizontal: normalize(35)
    },
    PH40: {
        paddingHorizontal: normalize(40)
    },
    PH50: {
        paddingHorizontal: normalize(50)
    },
    PH70: {
        paddingHorizontal: normalize(70)
    },

    BRadius5: {
        borderRadius: normalize(10)
    },

    /**
     * height
     */
    H30: {
        height: normalize(30)
    },
    H40: {
        height: normalize(40)
    },
    H50: {
        height: normalize(50)
    },
    H55: {
        height: normalize(55)
    },
    H100: {
        height: normalize(100)
    },
    H200: {
        height: normalize(200)
    },
    H100P: {
        height: '100%'
    },

    /**
     * width
     */
    W25P: {
        width: '25%'
    },
    W33P: {
        width: '33.33%'
    },
    W45P: {
        width: '45%'
    },
    W50P: {
        width: '50%'
    },
    W75P: {
        width: '75%'
    },
    W100P: {
        width: '100%'
    },


    /**
     * color
     */
    CLW: {
        color: COLOR.white
    },
    CLBlack: {
        color: COLOR.black
    },
    CLGrey: {
        color: COLOR.grey
    },
    CLGrey1: {
        color: COLOR.grey1
    },
    CLPrimary: {
        color: COLOR.primary
    },
    CLSuccess: {
        color: COLOR.success
    },
    CLWarning: {
        color: COLOR.warning
    },
    CLDanger: {
        color: COLOR.danger
    },
    CLInfo: {
        color: COLOR.info
    },
    CText2: {
        color: COLOR.textColor2
    },
    CText3: {
        color: COLOR.textColor3
    },

    /**
     * backgroundColor
     */
    BKW: {
        backgroundColor: COLOR.white
    },
    BKBase: {
        backgroundColor: COLOR.base
    },
    BKPrimary: {
        backgroundColor: COLOR.primary
    },
    BKSuccess: {
        backgroundColor: COLOR.success
    },
    BKDanger: {
        backgroundColor: COLOR.danger
    },
    BKWarning: {
        backgroundColor: COLOR.warning
    },
    BKCurrency: {
        backgroundColor: COLOR.currencyColor
    },
    BKGrey2: {
        backgroundColor: COLOR.grey2
    },

})

export const CarStyle = {
    odmeteritems: [
        'Select',
        '10 - 20k miles',
        '20 - 30k miles',
        '30 - 40k miles',
        '40 - 50k miles',
        '50 - 60k miles',
        '60 - 70k miles',
        '70 - 80k miles',
        '80 - 90k miles',
        '90 - 100k miles'
    ],
    transmissionitems: [
        'Select',
        'Manual',
        'Automatic',
        'Continuously variable',
        'Semi-automatic and dual-clutch'
    ],
    trimitems: [
        'Select',
        'AMG E 43 4MATIC',
        'AMG E 63 4MATIC',
        'E 300 AMG Line'
    ],
    carstyleitems: [
        'Select',
        '4dr Sedan AWD(3.0L 6cyl Turbo 9A)',
        '4dr Sedan AWD(3.0L 6cyl Turbo 9A)'
    ],
    trimlist: [
        {
            value: 1,
            label: 'AMG E 43 4MATIC'
        },
        {
            value: 2,
            label: 'AMG E 63 4MATIC'
        },
        {
            value: 3,
            label: 'E 300 AMG Line'
        }
    ],
    transmissionlist: [
        {
            value: 1,
            label: 'Manual'
        },
        {
            value: 2,
            label: 'Automatic '
        },
        {
            value: 3,
            label: 'Continuously variable'
        },
        {
            value: 4,
            label: 'Semi-automatic and dual-clutch'
        }
    ],
    odmeterlist: [
        {
            value: 1,
            label: '10 - 20k miles'
        },
        {
            value: 2,
            label: '20 - 30k miles'
        },
        {
            value: 3,
            label: '30 - 40k miles'
        },
        {
            value: 4,
            label: '40 - 50k miles'
        },
        {
            value: 5,
            label: '50 - 60k miles'
        },
        {
            value: 6,
            label: '60 - 70k miles'
        },
        {
            value: 7,
            label: '70 - 80k miles'
        },
        {
            value: 8,
            label: '80 - 90k miles'
        },
        {
            value: 9,
            label: '90 - 100k miles'
        }
    ],
}