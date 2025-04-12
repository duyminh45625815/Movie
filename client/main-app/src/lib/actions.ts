/* eslint-disable @typescript-eslint/no-explicit-any */
// Code by: Truong Vu
import { signIn } from "next-auth/react";
import {  APIError, fetchData, patchData, postData } from "@/services/api";
import { showtimeType, TypeTicket } from "@/types";

/**
 * The mask of user type
 */
interface usertype {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  rePassword: string,
}




/**
 * The mask of response
 */
interface response {
  message: string,
  error?: { message: string },
  userId?: string,
}

interface theater {
  name: string,
  address: string,
}


/**
 * The mask of film response
 */
interface flimRes {
  results: any[];
}



/**
 * 
 * @param username 
 * @param password 
 * Step1: Call signIn from next-auth
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export async function login(username: string, password: string) {
  const response = await signIn("credentials", {
    redirect: false,
    username,
    password,
  });
  return response?.error ? { error: response?.code } : { success: true };
}





/**
 * 
 * @param user 
 * Step1: Call postData to register user
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export const register = async (user: usertype) => {
  const result = await postData<response>("/auth/signUp", user, undefined);
  return result.error ? { error: result.error } : result;
}






/**
 * Step1: Call fetchData to get films
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns results
 */
export const getFilms = async () => {
  try {
   const results = await fetchData<flimRes>("/films/getFilms", {})
   return results
  } catch (error) {
    throw error;
  }
};





export const getFoods = async()=>{
  try {
    const results = await fetchData("/food/findallFood",{})
    return results
  } catch (error ) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}





/** 
 * @param films 
 * Step1: Call postData to create films
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export const createFilms = async (films:FormData) => {
  try {
    const response = await postData("/films/add-films", films,true);
    if (!response) {
      throw new APIError("Lỗi khi thêm phim");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
    throw error;
  }
};






export const createFoods = async(foods:FormData)=>{
  try {
    const response = await postData("/food/add-foods", foods,true);
    if (!response) {
      throw new APIError("Lỗi khi thêm thức ăn");
    }
    return response;
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}







/**
 * 
 * @param verificationCode 
 * @param email 
 * Step1: Call postData to verify user
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export const verify = async (verificationCode:string, email:string) => {
  const result = await postData<response>("/auth/verify", {verificationCode:verificationCode, email:email}, undefined);
  return result.error ? { error: result.error } : result?.message;
}










/**
 * @param id 
 * @param films
 * Step1: Call patchData to update films
 * Step2: Check if response has error, return error code
 * Step3: Return success 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateFilmsAPI = async (id:string,films:any) => {
  try {
    const response = await patchData(`/films/update-films/${id}`, films,true);
    if (!response) {
      throw new APIError("Lỗi khi cập nhật phim");
    }
    return response;
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}


export const findByIDFilms = async(id:string)=>{
  const res = await fetchData(`/films/${id}`, {})
  return res;
}





export const createTheater = async (theater:theater) => {
  try {
    const response = await postData("/theaters/add-theaters", theater,true);
    if (!response) {
      throw new APIError("Lỗi khi thêm rạp");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm rạp:", error);
    throw error;
  }
}






export const getTheaters = async () => {
  try {
   const results = await fetchData("/theaters/findtheater", {})
   return results
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp:", error);
    throw error;
  }
};








export const createRoomToTheater = async (room:any, threaterId:string) => {
  try {
    const response = await postData<response>(`/theaters/add-room/${threaterId}`,room,true);
    if (!response) {
      throw new APIError("Lỗi khi thêm phòng");
    }
    return response;
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}



export const createShowtimes = async (showtime: showtimeType )=>{
  try{
    const res = await postData<response>('showtime/addShowtime',showtime,true);
    if(!res){
      throw new APIError("Lỗi khi thêm suất chiếu")
    }
    return res;
  }catch(error){
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}




export const getShowTime = async()=>{
  try {
    const res= await fetchData('showtime/findAlltime', {});
    return res ;
  } catch (error) {
   if(error instanceof APIError){
    throw new APIError(error.message)
   }
  }
}


export const getShowtimeByid = async(id:string)=>{
  try {
    const res = await fetchData(`showtime/FindOnetime/${id}`,{})
    return res
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}

export const createTicket = async(booking: TypeTicket)=>{
  try {
    const results = await postData('booking/addBooking',booking,true)
    console.log(results,"dữ lieu action")
    return results
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}

export const getTicket = async()=>{
  try {
    const results = await fetchData('booking/findAllticket',{})
    return results
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}


export const updateticket = async(id:string)=>{
  try {
    const res = patchData('/booking/updateTicket',{_id:id},true)
    console.log(res,"hehehehehhehe")
    return res;
  } catch (error) {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}



/**
 * 
 * @param id 
 * Step 1 : Call the router api for update
 * Step 2 : return array data res if error throw new 
 * @returns 
 */
export const updateStatus = async(id:string)=>{
  try {
    const res = patchData('/showtime/updateStatus',{_id:id},true)
    return res;
  } catch (error)  {
    if(error instanceof APIError){
      throw new APIError(error.message)
    }
  }
}