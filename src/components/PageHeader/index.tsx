import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { style } from './styles';
import { colors } from '@/theme';

type Props = {
  title: string;
  subtitle?: string;
  rightButton?: {
    onPress: () => void;
    icon: keyof typeof MaterialIcons.glyphMap;
  };
};

export function PageHeader({ title, subtitle, rightButton }: Props) {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <MaterialIcons name='arrow-back' size={32} color={colors.black} />
        </TouchableOpacity>

        {rightButton && (
          <TouchableOpacity activeOpacity={0.8} onPress={rightButton.onPress}>
            <MaterialIcons
              name={rightButton.icon}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={style.title}>{title}</Text>
      {subtitle && <Text style={style.subtitle}>{subtitle}</Text>}
    </View>
  );
}
