import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FaCamera } from "react-icons/fa";
import { useRef } from "react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      _method: "PATCH",
      name: user.name,
      email: user.email,
      avatar: null,
    });

  const submit = (e) => {
    e.preventDefault();

    // Create a new FormData instance and append form data
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    // Send the FormData using the post method
    post(route("profile.update"), {
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      preserveScroll: true,
      onSuccess: () => {
        // If successful, update the avatar preview
        if (avatarRef.current && data.avatar) {
          const imageUrl = window.URL.createObjectURL(data.avatar);
          avatarRef.current.src = imageUrl;
        }
      },
    });
  };

  const avatarRef = useRef(null);

  const ChangeAvatar = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setData("avatar", files[0]);

      const imageUrl = window.URL.createObjectURL(files[0]);
      if (avatarRef.current) {
        avatarRef.current.src = imageUrl;
      }

      return () => {
        window.URL.revokeObjectURL(imageUrl);
      };
    }
  };

  return (
    <section className={className}>
      <header>
        <h2 className="font-lexend text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 font-lexend text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6 font-lexend">
        <div className="relative">
          <img
            src={`/storage/avatars/${user.id}.png`}
            alt={user.name}
            className="mx-auto h-20 w-20 rounded-full border border-custom-yellow"
            ref={avatarRef}
          />

          <label
            htmlFor="avatar"
            className="btn btn-primary absolute left-1/2 top-6 flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-black p-2 text-white"
            tabIndex={0}
            style={{ zIndex: 10 }}
          >
            <FaCamera className="h-6 w-6 font-lexend text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none" />
            <input
              type="file"
              onChange={ChangeAvatar}
              id="avatar"
              className="hidden"
            />
          </label>
        </div>

        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 font-lexend text-sm text-red-500">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="rounded-md font-lexend text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 font-lexend text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 font-lexend">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="font-lexend text-sm text-green-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
