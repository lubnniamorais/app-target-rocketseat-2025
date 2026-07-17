import { useSQLiteContext } from 'expo-sqlite';

export type TargetCreate = {
  name: string;
  amount: number;
};

export function useTargetDatabase() {
  // Acessando a instancia do banco
  const database = useSQLiteContext();

  async function create(data: TargetCreate) {
    const statment = await database.prepareAsync(
      'INSERT INTO targets (name, amount) VALUES ($name, $amount);'
    );

    statment.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }

  return {
    create,
  };
}
