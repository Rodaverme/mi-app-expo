import { Text, TextInput, TextInputProps, View, StyleSheet } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
}

export function CustomInput({ label, style, ...inputProps }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#737373"
        style={[styles.input, style]}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: '#242424',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    borderColor: '#c9c9c9',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#242424',
    fontSize: 16,
  },
});
