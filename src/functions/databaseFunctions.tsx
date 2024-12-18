const fetchItems = async (
  table: string,
  columns: string[] = [],
  orderBy: string = "id",
  ascend: boolean = true
) => {
  try {
    const response = await fetch(`/api/${table}?columns=${columns.join(",")}&orderBy=${orderBy}&ascending=${ascend}`);
    if (!response.ok) {
      throw new Error(`There was an error fetching the data from: ${table}`);
    }
    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred while fetching data';
  }
};

const insertItems = async (table: string, newData: Record<string, string | number >) => {
  try {
    const response = await fetch(`/api/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData)
    });
    
    if (!response.ok) {
      throw new Error(`There was an error inserting new data into the table: ${table}`);
    }
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred while inserting data';
  }
};

const updateItems = async (
  table: string,
  newData: Record<string, string | number>,
  where: string,
  whereValue: string | number
) => {
  try {
    const response = await fetch(`/api/${table}/${whereValue}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData)
    });

    if (!response.ok) {
      throw new Error(`There was an error updating the row where ${where} is ${whereValue}`);
    }
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred while updating data';
  }
};

const deleteItems = async (
  table: string,
  _where: string,
  whereValue: string | number
) => {
  try {
    const response = await fetch(`/api/${table}/${whereValue}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`There was an error deleting the row from table ${table}`);
    }
    return await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
    return 'An error occurred while deleting data';
  }
};

export { fetchItems, insertItems, updateItems, deleteItems };
