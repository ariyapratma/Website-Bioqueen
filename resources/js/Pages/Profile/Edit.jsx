import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Profile" />

      <div className="py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Gunakan grid layout untuk membagi tampilan */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Card Update Profile */}
            <div className="w-full bg-white p-4 shadow sm:rounded-lg sm:p-8">
              <UpdateProfileInformationForm
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                className="max-w-full"
              />
            </div>

            {/* Card Update Password */}
            <div className="w-full bg-white p-4 shadow sm:rounded-lg sm:p-8">
              <UpdatePasswordForm className="max-w-full" />
            </div>

            {/* Card Delete User */}
            <div className="w-full bg-white p-4 shadow sm:rounded-lg sm:p-8">
              <DeleteUserForm className="max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
