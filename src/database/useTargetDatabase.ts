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
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
        targets.created_at,
        targets.updated_at
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY current DESC
    `);
  }

  return {
    create,
    listBySavedValue,
  };
}
