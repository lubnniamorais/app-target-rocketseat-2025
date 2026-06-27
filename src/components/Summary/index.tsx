import { View, Text, ColorValue } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { style } from './styles';

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
};

export function Summary({ data, icon, isLeft = false }: Props) {
  return (
    <View style={style.container}>
      <View style={[style.header, isLeft && { justifyContent: 'flex-end' }]}>
        <MaterialIcons name={icon.name} size={16} color={icon.color} />
        <Text style={style.label}>{data.label}</Text>
      </View>

      <Text style={style.value}>{data.value}</Text>
    </View>
  );
}
