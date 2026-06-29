import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { style } from './styles';

export type TargetProps = {
  id?: string;
  name: string;
  percentage: string;
  current: string;
  target: string;
};

type Props = TouchableOpacityProps & {
  data: TargetProps;
};

export function Target({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={style.container} {...rest}>
      <View style={style.content}>
        <Text style={style.name} numberOfLines={1}>
          {data.name}
        </Text>

        <Text style={style.status} numberOfLines={1}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>

      <MaterialIcons name='chevron-right' size={20} />
    </TouchableOpacity>
  );
}
