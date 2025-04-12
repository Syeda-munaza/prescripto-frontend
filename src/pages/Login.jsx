import React from "react";

const Login = () => {
  const [state, setState] = React.useState("Sign Up");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const onSubmitHanlder = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form action="" className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] border sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p>
            {state === "Sign Up"
              ? "Please sign up to book appointment"
              : "Please login to book appointment"}
          </p>
          {state === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zin-300 rounded w-full p-2 mt-1"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                required
                autoComplete="off"
              />
            </div>
          )}
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zin-300 rounded w-full p-2 mt-1"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
              autoComplete="off"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-zin-300 rounded w-full p-2 mt-1"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
              autoComplete="off"
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base">
            {state === "Sign Up" ? "Create account" : "Login"}
          </button>
          <p>
            {state === "Sign Up" ? (
              <span>
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => setState("Login")}
                >
                  Login here
                </span>
              </span>
            ) : (
              <span>
                Create a new account?{" "}
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => setState("Sign Up")}
                >
                  Click here
                </span>
              </span>
            )}
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
