'use client'
import {useEffect, useState} from 'react';
import { useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { displayAlert } from "@/redux/actions/commonActions";
import { login, register } from "@/redux/actions/entryActions";
import {saveAccessToken} from "@/utils/token";

const commonClasses = {
  input: 'w-full border border-gray-300 rounded-md py-2 px-10 mb-4 text-white bg-gray-700',
  icon: 'absolute left-3 top-2',
  entryBtn: 'w-6/12 h-12 text-center bg-gradient-to-r from-purple-500 to-pink-500\n' +
    'hover:from-purple-600 hover:to-indigo-400 text-white\n' +
    'rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
  tourBtn: 'bn30 mt-0.5 w-6/12 px-4 text-white rounded-md focus:outline-none'
};

const EntryForm = () => {
  const router  = useRouter()
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [lastEmail, setLastEmail] = useState('')
  const [ isLoginForm, setIsLoginForm ] = useState(false);
  const [isEmailActive, setEmailActive] = useState(false)
  const [isPasswordActive, setPasswordActive] = useState(false)

  useEffect(() => {
    if(status === 'authenticated'){
      saveAccessToken(session?.session.accessToken);
      router.push("/todos");
    }
  }, [status]);

  const handleFormChange = (e) => {
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };

      if (e.target.name === 'email') {
        setLastEmail(e.target.value);
        setEmailActive(!!e.target.value);
      } else if (e.target.name === 'password') {
        setPasswordActive(!!e.target.value);
      }
      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password }= formData
    if (!isLoginForm) {
      if(!name || !email || !password){
        dispatch(displayAlert({
          alertText:'All fields are required',
          alertType: 'error' }))
        return;
      }
      dispatch(register({name, email, password })).then((data) => {
        if(data){
          setFormData({ name: "", email: "", password: "" })
          setLastEmail(email)
          setIsLoginForm(true)
        }
      })

    } else {
      if (!email || !password) {
        dispatch(displayAlert({
          alertText:'All fields are required',
          alertType: 'error' }))
        return;
      }
      dispatch(login({ email: lastEmail, password }))
      setFormData({ email: "", password: "" });
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
  };

  const takeTour = async() => {
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold mb-4 text-white">
            {isLoginForm ? 'Login' : 'Register'}
          </h1>
          {!isLoginForm && (
            <div className="relative">
              <span className={ commonClasses.icon }>
                <AiOutlineUser />
              </span>
              <input
                type="text"
                name="name"
                value={ formData.name }
                placeholder="Username"
                className={ commonClasses.input }
                onChange={ handleFormChange }
                required
              />
            </div>
          )}
          <div className="relative">
            <span className={ commonClasses.icon }
                  style={{color: isEmailActive ? '#7c3aed' : 'white'}}>
              <AiOutlineMail />
            </span>
            <input
              type="email"
              name="email"
              value={ formData.email }
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-2 px-10 mb-4 text-white bg-gray-700"
              onChange={ handleFormChange }
              required
            />
          </div>
          <div className="relative">
            <span className={ commonClasses.icon }
                  style={{color: isPasswordActive ? '#7c3aed' : 'white'}}
            >
              <AiOutlineLock />
            </span>
            <input
              type="password"
              name="password"
              value={ formData.password }
              placeholder="Password"
              className={ commonClasses.input }
              onChange={ handleFormChange }
              required
            />
          </div>
          <div className="flex justify-between space-x-4 my-4">
            <button
              type="submit"
              className={ commonClasses.entryBtn }
            >
              { isLoginForm ? 'Login' : 'Register' }
            </button>
            <button
              type='button'
              className= { commonClasses.tourBtn }
              onClick={ takeTour }
            >
              <span className="text">Take a tour</span>
            </button>
          </div>
          <p className="text-center text-sm text-gray-400">
              { isLoginForm ? "Don't have an account?" : 'Already have an account?' }
            <span className="text-sm text-gray-200 ml-1 cursor-pointer underline" onClick={ toggleForm }>
              { isLoginForm ? 'Register here' : 'Login here' }
            </span>
          </p>
        </form>
      </div>
      <style jsx>{`
      .bn30 {
        cursor: pointer;
        font-size: 16px;
        padding: 0; 
        height: 44px;
        background-color: transparent;
        border: 5px solid transparent;
        position: relative;
        box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.8);
        border-radius: 0.375rem;  
      }
      .bn30:before {
        content: "";
        position: absolute;
        top: -5px; right: -5px; bottom: -5px; left: -5px;
        z-index: -1;
        background: linear-gradient(to right, #22c55e, #b06ab3);
        border-radius: inherit;
      }
      .bn30 .text {
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(to right, #22c55e, #b06ab3);
      }
      .bn30:hover:before {
        background: linear-gradient(to left, #22c55e, #b06ab3);
      }
      .bn30:hover .text {
        background-image: linear-gradient(to left, #22c55e, #b06ab3);
      }
    `}</style>
    </div>
  );
};

export default EntryForm;

