import { Button, View } from 'react-native';
import { router } from 'expo-router';

import { PageHeader } from '@/components/PageHeader';

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title='Meta'
        subtitle='Economize para alcançar sua meta financeria'
        rightButton={{
          icon: 'edit',
          onPress: () => {},
        }}
      />

      <Button title='Voltar' onPress={() => router.back()} />
    </View>
  );
}
