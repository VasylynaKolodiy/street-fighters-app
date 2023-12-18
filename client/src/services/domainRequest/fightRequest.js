import { get, post } from "../requestHelper";

const entity = 'fights';

export const saveFight = async (body) => {
  return await post(entity, body);
}
export const getFights = async () => {
  return await get(entity);
}