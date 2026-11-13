import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { ApiClient } from "@/config/api/apiClient";
import { AuthApiDataSource } from "@/infrastructure/datasources/auth.api.datasource";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository.impl";
import { AuthProvider } from "@/presentation/providers/AuthProvider";

const authRepository = new AuthRepositoryImpl(
    new AuthApiDataSource(new ApiClient(process.env.EXPO_PUBLIC_API_URL ?? "")),
);

export default function RootLayout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <AuthProvider authRepository={authRepository}>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
        </ThemeProvider>
    );
}
