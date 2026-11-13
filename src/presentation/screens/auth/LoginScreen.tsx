import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BrandColors, Colors, Spacing } from "@/config/theme/theme";
import { CustomInput } from "@/presentation/components/CustomInput";
import { useAuth } from "@/presentation/providers/AuthProvider";

export function LoginScreen() {
    const { isLoading, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const colorScheme = useColorScheme() ?? "light";
    const theme = Colors[colorScheme];

    const submit = async () => {
        setErrorMessage(null);
        if (!email.trim() || !password) {
            setErrorMessage("Ingresa tu correo y contraseña.");
            return;
        }

        try {
            await login({ email: email.trim(), password });
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "No se pudo iniciar sesión.",
            );
        }
    };

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: theme.background }]}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.form}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("@/assets/images/logo.png")}
                                style={styles.logo}
                                resizeMode="contain"
                                accessibilityLabel="Logo de Farmart"
                            />
                        </View>

                        <Text style={[styles.title, { color: theme.text }]}>
                            Iniciar sesión
                        </Text>
                        <Text
                            style={[
                                styles.subtitle,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Ingresa tus datos para continuar.
                        </Text>

                        <CustomInput
                            label="Correo electrónico"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="nombre@ejemplo.com"
                            keyboardType="email-address"
                            autoComplete="email"
                            returnKeyType="next"
                        />
                        <CustomInput
                            label="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Tu contraseña"
                            secureTextEntry
                            autoComplete="current-password"
                            returnKeyType="done"
                            onSubmitEditing={submit}
                        />

                        {errorMessage ? (
                            <Text
                                accessibilityRole="alert"
                                style={styles.error}
                            >
                                {errorMessage}
                            </Text>
                        ) : null}

                        <Pressable
                            accessibilityRole="button"
                            disabled={isLoading}
                            onPress={submit}
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: theme.primary },
                                (pressed || isLoading) && styles.buttonMuted,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color:
                                            colorScheme === "dark"
                                                ? BrandColors.navyDark
                                                : "#ffffff",
                                    },
                                ]}
                            >
                                {isLoading ? "Ingresando…" : "Entrar"}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        padding: Spacing.four,
    },
    form: {
        width: "100%",
        maxWidth: 440,
        alignSelf: "center",
        gap: 18,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: Spacing.two,
    },
    logo: {
        width: 240,
        height: 110,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        alignSelf: "center",
    },
    subtitle: {
        fontSize: 16,
        marginTop: -12,
        marginBottom: 6,
        alignSelf: "center",
    },
    error: {
        color: "#D92D20",
        fontSize: 14,
    },
    button: {
        minHeight: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 4,
    },
    buttonMuted: {
        opacity: 0.65,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "700",
    },
});
