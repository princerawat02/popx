import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify({ email }));
        setIsSubmitting(false);
        navigate("/account");
      }, 500);
    },
    [email, navigate]
  );

  const isButtonDisabled = useMemo(
    () => isSubmitting || !email || !password,
    [isSubmitting, email, password]
  );

  return (
    <div className="aspect-[9/16] h-full flex flex-col items-start justify-between bg-[#f7f8f9] p-6">
      <div className="w-full">
        <h1 className="text-3xl font-bold max-w-3/5 mb-4">
          Signin to your PopX account
        </h1>
        <p className="text-xl text-gray-600 max-w-2/3 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          ex!
        </p>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="mb-6 relative">
            <div className="border border-gray-400 rounded-md px-3 pt-3 pb-2 focus-within:border-[#4285F4]">
              <label
                className="absolute -top-2.5 left-3 px-1 bg-[#f7f8f9] text-purple-700 text-sm font-medium transition-all duration-150"
                htmlFor="email"
                style={{ pointerEvents: "none" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="w-full border-none outline-none text-gray-900 px-0 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="mb-6 relative">
            <div className="border border-gray-400 rounded-md px-3 pt-3 pb-2 focus-within:border-[#4285F4]">
              <label
                className="absolute -top-2.5 left-3 bg-[#f7f8f9] px-1 text-purple-700 text-sm font-medium transition-all duration-150"
                htmlFor="password"
                style={{ pointerEvents: "none" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="w-full border-none outline-none text-gray-900 px-0 bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`text-white font-semibold w-full text-center bg-[#302644] hover:bg-[#5d0ec0] p-2 rounded-md mb-2 ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isButtonDisabled}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
