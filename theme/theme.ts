import { StyleProp, TextStyle, ViewStyle } from "react-native";

export type ThemePalette = {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textWeak: string;
  textInvert: string;
  border: string;
  //----------------------------
  white: string;
  lightGray: string;
  red: string;
  shadow: string;
};
export type Theme = {
  colorPalette: ThemePalette;
  size: {
    unit: number;
    sectionGap: number;
    rad1: number;
    rad2: number;
    rad3: number;
    pad1: number;
    pad2: number;
    pad3: number;
    mar1: number;
    mar2: number;
    mar3: number;
    text1: number;
    text2: number;
    text3: number;
    text4: number;
    avatarSmall: number;
    avatarMedium: number;
    avatarLarge: number;
    input: number;
    inputSmall: number;
    inputRadius: number;
    icon1: number;
  };
  commonStyles: {
    screen: ViewStyle;
    section: ViewStyle;
    text: {
      h1: TextStyle;
      h2: TextStyle;
      h3: TextStyle;
      bold: TextStyle;
      subtitle: TextStyle;
      body1: TextStyle;
      body2: TextStyle;
      caption: TextStyle;
      label: TextStyle;
      lineThrough: TextStyle;
    };
    inputBase: ViewStyle;
    buttonBase: ViewStyle;
    buttonSmall: ViewStyle;
    center: {
      vertical: ViewStyle;
      horizontal: ViewStyle;
    };
    shadow: ViewStyle;
    flex: ViewStyle;
    row: ViewStyle;
    mt1: TextStyle;
    mt2: TextStyle;
    p1: ViewStyle;
    p2: ViewStyle;
    p3: ViewStyle;
    ph1: ViewStyle;
    ph2: ViewStyle;
    ph3: ViewStyle;
    pv1: ViewStyle;
    pv2: ViewStyle;
    br: ViewStyle;
    brt: ViewStyle;
    bordered: ViewStyle;
  };
};
export const SIZE_UNIT = 4;
const lightColors: ThemePalette = {
  background: "#fff",
  primary: "#0070be",
  secondary: "#0583F2",
  accent: "#c30045",
  text: "#27272a",
  textWeak: "#71717a",
  textInvert: "#fff",
  border: "#f6f6f6",
  lightGray: "#f6f6f6",
  //----------------------------
  shadow: "rgba(0, 0, 0, 0.25)",
  white: "#fff",
  red: "#ff002e",
};
export const lightTheme: Theme = {
  colorPalette: lightColors,
  size: {
    unit: SIZE_UNIT,
    sectionGap: SIZE_UNIT * 2,
    rad1: SIZE_UNIT,
    rad2: SIZE_UNIT * 2,
    rad3: SIZE_UNIT * 3,
    pad1: SIZE_UNIT,
    pad2: SIZE_UNIT * 2,
    pad3: SIZE_UNIT * 3,
    mar1: SIZE_UNIT,
    mar2: SIZE_UNIT * 2,
    mar3: SIZE_UNIT * 3,
    text1: SIZE_UNIT,
    text2: SIZE_UNIT * 2,
    text3: SIZE_UNIT * 3,
    text4: SIZE_UNIT * 4,
    avatarLarge: SIZE_UNIT * 32,
    avatarMedium: SIZE_UNIT * 16,
    avatarSmall: SIZE_UNIT * 8,
    input: SIZE_UNIT * 10,
    inputSmall: SIZE_UNIT * 5,
    inputRadius: SIZE_UNIT * 10,
    icon1: SIZE_UNIT * 4,
  },
  commonStyles: {
    screen: {
      flex: 1,
      backgroundColor: lightColors.background,
    },
    section: {
      marginBottom: SIZE_UNIT * 4,
    },
    text: {
      h1: { fontSize: 32, fontWeight: "bold", marginBottom: SIZE_UNIT * 3 },
      h2: { fontSize: 24, fontWeight: "bold", marginBottom: SIZE_UNIT * 3 },
      h3: { fontSize: 16, fontWeight: "bold", marginBottom: SIZE_UNIT * 3 },
      bold: { fontSize: 13, fontWeight: "bold" },
      subtitle: { fontSize: SIZE_UNIT * 2, fontWeight: "bold" },
      body1: { fontSize: 13 },
      body2: { fontSize: 16 },
      caption: { fontSize: 11, fontStyle: "italic", color: lightColors.textWeak },
      label: { fontSize: 12, fontWeight: "bold" },
      lineThrough: { textDecorationLine: "line-through" },
    },
    inputBase: {
      height: SIZE_UNIT * 10,
      borderRadius: SIZE_UNIT * 10,
      backgroundColor: lightColors.lightGray,
      paddingHorizontal: SIZE_UNIT * 2,
    },
    buttonBase: {
      height: SIZE_UNIT * 10,

      borderRadius: SIZE_UNIT * 10,
      backgroundColor: lightColors.lightGray,
    },
    buttonSmall: {
      height: SIZE_UNIT * 5,
    },
    bordered: {
      borderWidth: 1,
      borderColor: lightColors.border,
    },
    center: {
      horizontal: { alignItems: "center" },
      vertical: {
        justifyContent: "center",
      },
    },
    shadow: {
      shadowColor: lightColors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    flex: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: SIZE_UNIT,
    },
    br: {
      borderRadius: SIZE_UNIT * 3,
      overflow: "hidden",
    },
    brt: {
      borderTopRightRadius: SIZE_UNIT * 2,
      borderTopLeftRadius: SIZE_UNIT * 2,
    },
    mt1: { marginTop: SIZE_UNIT },
    mt2: { marginTop: SIZE_UNIT * 2 },
    p1: { padding: SIZE_UNIT },
    p2: { padding: SIZE_UNIT * 2 },
    p3: { padding: SIZE_UNIT * 3 },
    ph1: { paddingHorizontal: SIZE_UNIT },
    ph2: {
      paddingHorizontal: SIZE_UNIT * 2,
    },
    ph3: {
      paddingHorizontal: SIZE_UNIT * 3,
    },
    pv1: { paddingVertical: SIZE_UNIT },
    pv2: { paddingVertical: SIZE_UNIT * 2 },
  },
};
