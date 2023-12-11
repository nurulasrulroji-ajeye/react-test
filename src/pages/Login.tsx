import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { onLogin } from '../fetures/auth/slice';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigete = useNavigate();
  const { authorization } = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  const disabled = input.password !== '' && input.username !== '';

  const handleLogin = () => {
    dispatch(onLogin({ username: input.username, password: input.password }));
  };

  useEffect(() => {
    if (authorization) {
      navigete('/');
    }
  });

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-full flex flex-col gap-5 border border-black mx-4 p-4 md:max-w-md rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Login</h2>
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center">
            <label htmlFor="username" className="basis-1/3">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              placeholder="Your username"
              className="w-full px-4 py-3 outline-none border border-black rounded-lg"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="password" className="basis-1/3">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="Your password"
              className="w-full px-4 py-3 outline-none border border-black rounded-lg"
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="px-8 py-3 border border-black rounded-lg font-semibold disabled:text-gray-600 disabled:border-gray-600 disabled:cursor-not-allowed"
            disabled={!disabled}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
