import { Eye, EyeClosed, LockIcon, Mail } from "lucide-react";
import { useState } from "react";
import { loginApi } from "../Hooks/useFetch";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false)





  const validate = () => {
    const e: typeof errors = {}
    // handle Error Email Required and Password Required
    if(!email.trim()) e.email = "Email is required"
    if(!password.trim()) e.password = "Password is required"

    // handle Error Invalid Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(email && !emailRegex.test(email)) e.email = "Invalid email"

    // handle Error Password must be at least 6 characters
    if(password && password.length < 6) e.password = "Password must be at least 6 characters"

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!validate()) return

    setLoading(true)

    try {
        await new Promise((r) => setTimeout(r, 900));
        setLoading(false);
      const res = await loginApi({ email, password });

      // save token
      localStorage.setItem("token", res.access_token);

      console.log("Login success:", res);

      window.location.href = "/admin";
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }


  }

  return (
    <>
      <section className="login w-screen flex items-center justify-center h-screen bg-green-200">
        <main className=" p-10 shadow-2xl rounded-2xl bg-white w-96 h-96 ">
          <h1 className="text-xl font-bold ">Admin Login</h1>

          <form action="" onSubmit={handleSubmit } className="py-2 flex gap-2 flex-col">
            <label htmlFor="Email">Email</label>
            <div className=" space-x-2 relative">
              <Mail className=" p-1 text-gray-400 pointer-events-none absolute self-center ml-2 " />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="border w-full pl-9 h-11 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="Email"
                id="Email"
              />
            </div>
            {/* handle Error Email Required  */}
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <label htmlFor="Password">Password</label>

            <div className=" space-x-2 relative">
              {ShowPassword ? (
                <Eye
                  onClick={() => setShowPassword(false)}
                  className=" text-gray-400 absolute right-0 self-center "
                />
              ) : (
                <EyeClosed
                  onClick={() => setShowPassword(true)}
                  className=" text-gray-400 absolute right-0 self-center "
                />
              )}

              <LockIcon className=" p-1 text-gray-400 pointer-events-none absolute self-center ml-2 " />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={ShowPassword ? "text" : "password"}
                placeholder="Password"
                className="border w-full pl-9  pr-10 h-11 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="Password"
                id="Password"
              />
            </div>
            {/* handle Error Password Required  */}
            {errors.password && <p className="text-red-500">{errors.password}</p>}

            <button type="submit" className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </main>
      </section>
    </>
  );
}
