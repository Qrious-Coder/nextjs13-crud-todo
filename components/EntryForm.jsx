import { useState } from 'react';
import { signIn, register } from 'next-auth/react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

const EntryForm = () => {
  const [formData, setFormData] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const handleFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const result = await signIn('credentials', {
        ...formData,
        redirect: false,
      });

      if (result.error) {
        // Handle login error
        console.log('Login error:', result.error);
      } else {
        // User logged in successfully
        console.log('User logged in:', result);
      }
    } else {
      const result = await register({
        ...formData,
        redirect: false,
      });

      if (result.error) {
        // Handle registration error
        console.log('Registration error:', result.error);
      } else {
        // User registered successfully
        console.log('User registered:', result);
      }
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
                name="username"
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

