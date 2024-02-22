export const ec = async (res: Response) => {
  try {
    const data = await res.json();
    if (data && data.success === false) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    // console.error(err);
  }
};
export function sTime(staleTimeInMinutes: number) {
  const staleTime = 1000 * 60 * staleTimeInMinutes;
  return {
    staleTime,
    initialDataUpdatedAt: Date.now() - staleTime,
  };
}
//check is array is not undefine of length is greater than 0
export const isArr = (arr?: any[]) => {
  return arr && arr.length > 0;
};
