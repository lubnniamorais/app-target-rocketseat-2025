import { useSQLiteContext } from 'expo-sqlite';

export type TargetCreate = {
  name: string;
  amount: number;
};

export type TargetResponse = {
  id: number;
  name: string;
  amount: number;
  current: number; // Total que tem guardado de uma meta
  percentage: number;
  created_at: Date;
  updated_at: Date;
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

  function listBySavedValue() {
    return database.getAllAsync<TargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount,
      FROM targets  
    `);
  }

  return {
    create,
    listBySavedValue,
  };
}
