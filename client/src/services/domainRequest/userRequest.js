import {post, get, put, deleteReq} from "../requestHelper";
const entity = 'users'

export const createUser = async (body) => {
    return await post(entity, body);
}
export const getUsers = async () => {
    return await get(entity);
}
export const getUser = async (id) => {
    return await get(entity, id);
}
export const editUser = async (id, body) => {
    return await put(entity, id, body);
}
export const removeUser = async (id) => {
    return await deleteReq(entity, id);
}