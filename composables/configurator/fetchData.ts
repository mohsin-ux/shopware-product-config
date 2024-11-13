export const useFetchData = async <T = any>({
  url,
  method,
  headers,
  payload = null,
}: {
  url: string;
  method: "GET" | "POST";
  headers?: Record<string, string>;
  payload?: any;
}): Promise<any> => {
  console.log(`call this method`)
  const { data, error, pending } = await useFetch<any>(url, {
    method, 
    headers,
    ...(method === "POST" && { body: JSON.stringify(payload) }),
  });
  console.log(pending.value)
  if (!data.value) {
    throw new Error("No data received from the API");
  }

  const responseData: any = JSON.parse(JSON.stringify(data.value));
  const parsedData: any = Object.values(responseData);

  return { parsedData, loading: pending.value, error: error.value };
};
