import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import { PageHeader } from '@/components/PageHeader';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';

import { useTargetDatabase } from '@/database/useTargetDatabase';

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert('Atenção', 'Preencha todos os campos corretamente.');
    }

    setIsProcessing(true);

    if (params.id) {
      //se têm um ID então temos os dados e vamos atualizar
      update();
    } else {
      create();
    }
  }

  async function create() {
    try {
      await targetDatabase.create({
        name,
        amount,
      });
      Alert.alert('Nova Meta', 'Meta criada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a meta');
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function update() {
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount,
      });

      Alert.alert('Sucesso', 'Meta atualizada com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel atualizar a meta');
      console.log(error);
      setIsProcessing(false);
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);

      if (!response) {
        throw new Error('Meta nao encontrada');
      }

      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel carregar os detalhes da meta');
      console.log(error);
    }
  }

  function handleRemove() {
    if (!params.id) {
      return;
    }

    Alert.alert('Remover', 'Deseja realmente excluir essa meta?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          remove();
          router.back();
        },
      },
    ]);
  }

  async function remove() {
    try {
      setIsProcessing(true);

      await targetDatabase.remove(Number(params.id));
      Alert.alert('Sucesso', 'Meta excluida com sucesso!', [
        {
          text: 'Ok',
          onPress: () => router.replace('/'),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel excluir a meta');
      console.log(error);
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title='Meta'
        subtitle='Economize para alcançar sua meta financeria'
        rightButton={
          params.id
            ? {
                icon: 'delete',
                onPress: handleRemove,
              }
            : undefined
        }
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label='Nome da meta'
          placeholder='Ex: Viagem para a praia, Apple Watch'
          onChangeText={setName}
          value={name}
        />

        <CurrencyInput
          label='Valor alvo'
          value={amount}
          onChangeValue={setAmount}
        />

        <Button
          title='Salvar'
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
