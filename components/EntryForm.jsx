'use client'
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

const EntryForm = () => {
  const router  = useRouter()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true);

  const handleFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password }= formData
    if (!isLogin) {
      if(!name || !email || !password){
        setError("All fields are required");
        return;
      }

      const res = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
      })

      const result = await res.json();
      if (res.ok) {
        setFormData({ name: "", email: "", password: "" });
        router.push("/todos");
      } else {
        setError(result.error);
      }
      return result;
    } else {
      //todo: dispatch alert
      if (!email || !password) {
        setError("All fields are required");
        return;
      }

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      setFormData({ email: "", password: "" });
      router.push("/todos");
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
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-2 px-10 mb-4 text-white bg-gray-700"
              onChange={handleFormChange}
              required
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-md py-2 px-4 mb-4 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
          <p className="text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span className="text-sm text-gray-200 ml-1 cursor-pointer underline" onClick={toggleForm}>
              {isLogin ? 'Register here' : 'Login here'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;

