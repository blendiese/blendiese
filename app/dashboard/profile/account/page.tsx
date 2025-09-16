"use client";

export default function Page() {
  return (
    <div className="w-full max-w-sm">
      {/* TODO: Add Delete Account form/component here */}
      <p className="mb-4">Delete your account permanently.</p>
      <div className="bg-red-100 p-4 border rounded text-center">
        <button className="text-black px-4 py-2 rounded">Delete Account</button>
      </div>
    </div>
  );
}
