/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#182D52';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#ffffff',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ffffff',
    background: '#182D52',
    tint: tintColorDark,
    icon: '#182D52',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
