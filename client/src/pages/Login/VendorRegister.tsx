export const VendorRegister = () => {
  return (
    <div className="w-[480px] bg-white rounded-2xl shadow-xl p-8 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Vendor Registration</h2>

      <div className="space-y-5">
        <input
          className="w-full p-4 rounded-xl border border-gray-300"
          placeholder="Full Name"
        />

        <input
          className="w-full p-4 rounded-xl border border-gray-300"
          placeholder="Email"
        />

        <input
          className="w-full p-4 rounded-xl border border-gray-300"
          placeholder="Phone Number"
        />

        <select className="w-full p-4 rounded-xl border border-gray-300 bg-white">
          <option>Select Vendor Type</option>
          <option>Decorations</option>
          <option>Catering</option>
          <option>Photography</option>
          <option>Venue</option>
        </select>

        <textarea
          rows={4}
          className="w-full p-4 rounded-xl border border-gray-300"
          placeholder="Business Description"
        ></textarea>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-semibold shadow-md">
          Register as Vendor
        </button>
      </div>
    </div>
  );
};
