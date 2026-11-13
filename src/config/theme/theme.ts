import "@/global.css";

import { Platform } from "react-native";

export const BrandColors = {
    navy: "#232B62", // Azul marino principal del logo
    navyDark: "#171D45", // Variante oscura para estados activos o modo oscuro
    navyLight: "#36418A", // Variante clara para resaltar en modo oscuro
    lime: "#92C83E", // Verde lima del logo
    limeDark: "#78A82E", // Verde lima con mayor contraste para texto/iconos
    silver: "#8E9093", // Gris metálico medio del anillo
    silverLight: "#C4C6C8", // Gris metálico claro del anillo
} as const;

export const Colors = {
    light: {
        text: "#1A2044", // Azul marino muy oscuro para lectura nítida
        background: "#FFFFFF", // Fondo limpio blanco
        backgroundElement: "#F4F6F9", // Gris azulado suave para inputs y tarjetas
        backgroundSelected: "#E6EAF2", // Tinte azulado sutil para elementos seleccionados
        textSecondary: "#646875", // Gris neutro inspirado en el anillo metálico
        primary: BrandColors.navy, // Botones principales y encabezados (#232B62)
        secondary: BrandColors.lime, // Acentos, badges e indicadores activos (#92C83E)
        border: "#D5D8E0", // Bordes suaves para inputs
        tint: BrandColors.navy,
    },
    dark: {
        text: "#F8FAFC", // Blanco suave para evitar fatiga visual
        background: "#0F1326", // Fondo oscuro con matiz azul marino profundo
        backgroundElement: "#19203D", // Superficie de tarjetas e inputs
        backgroundSelected: "#252F57", // Elemento activo/seleccionado
        textSecondary: "#A8B0C2", // Gris plateado claro para subtítulos
        primary: BrandColors.lime, // En modo oscuro el verde lima (#92C83E) destaca mejor como acción principal
        secondary: "#4C5BB5", // Azul marino aclarado para contraste sobre fondo oscuro
        border: "#2D375E", // Bordes sutiles en modo oscuro
        tint: BrandColors.lime,
    },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: "system-ui",
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: "ui-serif",
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: "ui-rounded",
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: "ui-monospace",
    },
    default: {
        sans: "normal",
        serif: "serif",
        rounded: "normal",
        mono: "monospace",
    },
    web: {
        sans: "var(--font-display)",
        serif: "var(--font-serif)",
        rounded: "var(--font-rounded)",
        mono: "var(--font-mono)",
    },
});

export const Spacing = {
    half: 2,
    one: 4,
    two: 8,
    three: 16,
    four: 24,
    five: 32,
    six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
