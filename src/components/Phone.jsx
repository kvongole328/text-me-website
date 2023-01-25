import Axios from 'axios'
import React from 'react'
import { useState } from 'react';
import styles from '../style'


const Phone = () => {

//Check if the user has inserted their phone or not 
const [phoneInserted,setPhoneInserted] = useState(false);
//Set the actual phone number  
const [phone,setPhone] = useState('');

//set user ID 
const [UserId,setUserId] = useState('');

//Set the phone_id from Stytch
const [PhoneId,setPhoneId] = useState('');

//Verification in progress

const [InProgress,setInProgress] = useState(false); 

const [verification,setVerification] = useState('');
//Set if user is verified 
const [verified,setVerified] = useState(false);
const [process,setProcess] = useState(false)


    const handleSubmit = event => {
        event.preventDefault();
        console.log("Started event") 

        console.log("Phone number:",phone);
        setPhone('')
    };

    
    const sendVerification = event => {
        event.preventDefault()
        Axios({
            method: 'post',
            url: import.meta.env.VITE_SEND_SMS_URL,
            params: {
                phone_number: phone,
            },
            auth: { 
                username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
                password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
                
            },
    
        }).then(res => {
            console.log(res.data['Status'])
            setPhoneId(res.data['Phone_ID'])
            setUserId(res.data['User_ID'])
        }).catch(err => {
            console.log(err)
        })
        setProcess(true)
        setPhoneInserted(phone)
        setPhone('')
    };


    const verifyCode = event => {
        console.log("Phone: ", phone)
        event.preventDefault() 
        setInProgress(true)
        Axios({
            method: 'post',
            url: import.meta.env.VITE_VERIFY_SMS_URL,
            params: {
                phone_number: phoneInserted,
                verification_code: verification,
                user_id: UserId,
                phone_id: PhoneId


            },
            auth: { 
                username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
                password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
                
            },
    
        }).then(res => {
            console.log(res)
            if (res.data['Status'] === 200 )
            {
                setVerified(true)


            }
        }).catch(err => {
            console.log(err)
        })

        setPhoneInserted('')
        setVerification('')
    };
    
   return (
    <div className={`flex justify-start text-white `}>
        <div className={` ${styles.flexStart}
        flex-wrap xl:flex-nowrap x1:px-0 sm:px-16 px-6  text-white`}>
        
            {
            !verified ? (
                !process ? 
                (
                <div> 
                    <form onSubmit= {sendVerification} className='flex'>
                    <div className='pr-4'> 
                    <input type ="tel" value={phone} onChange={event => setPhone(event.target.value)} className='" bg-gray-50 border border-gray-300 text-left text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  placeholder= "Phone Number" required>
                    </input>
                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    
                </form>
                </div>
                ) : 
                !InProgress ?(
                <form onSubmit= {verifyCode} className='flex flex-row space-x-4 flex-auto'>
                <input type ="tel" value={verification} onChange={event => setVerification(event.target.value)} className='" bg-gray-50 border border-gray-300 text-left text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'  placeholder= "Enter verification code" required>
                </input>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
                ): 
                <h3 className='text-gradient font-poppins font-semibold'> Verifying code... </h3>
            ): 
            

            <h3 className='text-gradient font-poppins font-semibold'> Verification succesful - TextMe will reach out to you!  </h3>
            }
            
            </div> 

        
    </div>
   );
  
   };


export default Phone