'use client'
import {useEffect, useState} from 'react';
import { useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { displayAlert } from "@/redux/actions/commonActions";
import { login, register } from "@/redux/actions/entryActions";
import {saveAccessToken} from "@/utils/token";

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

  useEffect(() => {
    if(status === 'authenticated'){
      saveAccessToken(session?.session.accessToken);
      router.push("/todos");
    }
  }, [status]);

  const [ isLogin, setIsLogin ] = useState(false);

  const handleFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password }= formData
    if (!isLogin) {
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
          setIsLogin(true)
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
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl font-bold mb-4 text-white">{isLogin ? 'Login' : 'Register'}</h1>
          {!isLogin && (
            <div className="relative">
              <span className="absolute left-3 top-2">
                <AiOutlineUser />
              </span>
              <input
                type="text"
                name="name"
                value={ formData.name }
                placeholder="Username"
                className="w-full border border-gray-300 rounded-md py-2 px-10 mb-4 text-white bg-gray-700"
                onChange={handleFormChange}
                required
              />
            </div>
          )}
          <div className="relative">
            <span className="absolute left-3 top-2">
              <AiOutlineMail />
            </span>
            <input
              type="email"
              name="email"
              value={isLogin ? lastEmail : formData.email}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-2 px-10 mb-4 text-white bg-gray-700"
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2">
              <AiOutlineLock />
            </span>
            <input
              type="password"
              name="password"
              value={ formData.password }
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-2 px-10 mb-4 text-white bg-gray-700"
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="w-6/12 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-indigo-400 text-white rounded-md py-2 px-4 mb-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
            <button
              type='button'
              className="bn30 h-10 w-6/12 py-2 px-4 mb-4 text-white rounded-md focus:outline-none"
            >
              <span className="text">Take a tour</span>
            </button>
          </div>
          <p className="text-center text-sm text-gray-400">
            { isLogin ? "Don't have an account?" : 'Already have an account?' }
            <span className="text-sm text-gray-200 ml-1 cursor-pointer underline" onClick={ toggleForm }>
              { isLogin ? 'Register here' : 'Login here' }
            </span>
          </p>
        </form>
      </div>
      <style jsx>{`
      .bn30 {
        cursor: pointer;
        font-size: 16px;
        padding: 0; 
        background-color: transparent;
        border: 5px solid transparent;
        position: relative;
        box-shadow: 0 0 0 3px rgba(66,153,225, 0.5);
        border-radius: 0.375rem;  // match your previous style
      }
      .bn30:before {
        content: "";
        position: absolute;
        top: -5px; right: -5px; bottom: -5px; left: -5px;
        z-index: -1;
        background: linear-gradient(to right, #4568dc, #b06ab3);
        border-radius: inherit;
      }
      .bn30 .text {
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(to right, #4568dc, #b06ab3);
      }
      .bn30:hover:before {
        background: linear-gradient(to left, #4568dc, #b06ab3);
      }
      .bn30:hover .text {
        background-image: linear-gradient(to left, #4568dc, #b06ab3);
      }
    `}</style>
    </div>
  );
};

export default EntryForm;

