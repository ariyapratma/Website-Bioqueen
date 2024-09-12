const ManageHeaderHome = ({ headerHome = [] }) => {
  // Default value to an empty array
  return (
    <div className="bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold">Manage Header Home</h1>

      <div className="mb-6">
        <Link
          href="/header-home/create"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add New Header
        </Link>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Image URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              WhatsApp Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {headerHome.map((home) => (
            <tr key={home.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {home.title}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {home.description}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {home.image_url}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {home.whatsapp_link}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <Link
                  href={`/header-home/${home.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
