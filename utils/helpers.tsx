export const ec = async (res: Response) => {
  try {
    const data = await res.json();
    if (data && data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
