import { View, Text, TextInput, TextInputProps } from 'react-native';

import { style } from './styles';

import { colors } from '@/theme';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>

      <TextInput
        style={style.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  );
}
