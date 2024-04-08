
import axiosBase  from './AxiosConfig';

const  verifyUrl = async (_email = "",_code = "")=>{
 return await axiosBase({
    method: 'post',
    url: '/verify-url',
    data: {
      email: _email,
      code: _code,
    }
  });
}
const  forgetPassword = async (_email = "")=>{
  return await axiosBase({
     method: 'post',
     url: '/forgot-password',
     data: {
       email: _email,
     }
   });
 }
const  resetPassword = async (_email = "",_newPassword = "",_code = "")=>{
  return await axiosBase({
     method: 'post',
     url: '/reset-password',
     data: {
       email: _email,
       new_password : _newPassword,
       code: _code,
     }
   });
 }



export default {
  verifyUrl,
  forgetPassword,
  resetPassword
 }
