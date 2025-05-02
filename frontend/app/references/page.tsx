"use client";

export default function ReferencesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">➤ References</h1>

      <div className="space-y-8">
        <section className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="font-semibold text-lg mb-3">
            AMA/ACEP E/M Guidelines (2023)
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Official descriptors and instructions for Evaluation and Management
            coding decisions, from the American Medical Association and American
            College of Emergency Physicians.
          </p>
          <div className="border rounded overflow-hidden">
            <iframe
              src="/2023-e-m-descriptors-guidelines.pdf"
              className="w-full h-[700px] border-none"
              title="AMA Guidelines PDF"
            />
          </div>
        </section>

        {/* Future references can be added here */}
      </div>
    </main>
  );
}
