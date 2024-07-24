import AppContainer from "./AppContainer";
import { QueryClientProvider } from "./fetchers/queryClient";
import "./i18n/config";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation/StackNavigation";
import StoreProvider from "./store/StoreProvider";
import ThemeProvider from "./theme/ThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StoreProvider>
          <QueryClientProvider>
            <ThemeProvider>
              <AppContainer>
                <Navigation />
              </AppContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
