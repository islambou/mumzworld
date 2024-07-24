import { SIZE_UNIT, Theme, ThemePalette } from "../theme/theme";
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
// __mocks__/theme.js
export const mockTheme: Theme = {
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

// Mock the useTheme hook
export const useTheme = () => mockTheme;
