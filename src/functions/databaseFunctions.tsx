import supabase from "../utils/supbaseClient";

const fetchItems = async (
  table: string,
  columns: string[] = [],
  orderBy: string = "id",
  ascend: boolean = true
) => {
  try {
    const { data, status, statusText, error } = await supabase
      .from(table)
      .select(columns.join(","))
      .order(orderBy, { ascending: ascend });
    if (error) {
      throw new Error(`There was an error fetching the data from: ${table}`);
    }
    return { data, status, statusText };
  } catch (err) {
    return err.message;
  }
};

const insertItems = async (table: string, newData: Record<string, number>) => {
  try {
    const { status, statusText, error } = await supabase
      .from(table)
      .insert(newData);
    if (status !== 201 && error) {
      throw new Error(
        `There was an error inserting new data into the table: ${table}`
      );
    }
    return { status, statusText };
  } catch (err) {
    return err.message;
  }
};

const updateItems = async (
  table: string,
  newData: Record<string, number>,
  where: string,
  whereValue: string | number
) => {
  try {
    const { status, statusText, error } = await supabase
      .from(table)
      .update(newData)
      .eq(where, whereValue);
    if (status !== 204 && error) {
      throw new Error(
        `There was an error updating the row where ${where} is ${whereValue}, in table ${table}`
      );
    }
    return { status, statusText };
  } catch (err) {
    return err.message;
  }
};

const deleteItems = async (
  table: string,
  where: string,
  whereValue: string | number
) => {
  try {
    const { status, statusText, error } = await supabase
      .from(table)
      .delete()
      .eq(where, whereValue);
    if (status !== 204 && error) {
      throw new Error(
        `There was an error deleting the row from table ${table}, where ${where} is ${whereValue}`
      );
    }
    return { status, statusText };
  } catch (err) {
    return err.message;
  }
};

export { fetchItems, insertItems, updateItems, deleteItems };
