import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  // const submit = (e) => {
  //   e.preventDefault();
  //   post(route("login"));
  // };
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      onSuccess: () => {
        window.location.reload(); // Perbarui token CSRF setelah login
      },
    });
  };

  return (
    <Guest
      title="Login"
      description="Please Login To Continue To Your Account."
    >
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div>
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="font-lexend-medium ms-2 text-sm text-black">
              Remember Me
            </span>
          </label>

          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="font-lexend-medium text-sm text-black"
            >
              Forgot Your Password?
            </Link>
          )}
        </div>

        <div className="flex">
          <PrimaryButton className="w-full" disabled={processing}>
            Login
          </PrimaryButton>
        </div>
        <div className="flex justify-center">
          <p className="flex justify-center font-lexend text-sm text-gray-500">
            Need an account?
            <Link
              href={route("register")}
              className="ml-1 font-lexend text-sm text-blue-500"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </Guest>
  );
}
