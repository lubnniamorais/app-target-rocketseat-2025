import { View, Text } from 'react-native';
import Input, { CurrencyInputProps } from 'react-native-currency-input';

import { style } from './styles';

import { colors } from '@/theme';

type Props = CurrencyInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>

      <Input
        style={style.input}
        placeholderTextColor={colors.gray[400]}
        delimiter='.'
        separator=','
        precision={2} //É o número de casas decimais padrão
        minValue={0}
        {...rest}
      />
    </View>
  );
}
