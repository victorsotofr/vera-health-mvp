"use client";

export default function ReferencesPage() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-2xl font-semibold">➤ References</h1>

          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow space-y-4">
            <h2 className="font-semibold text-lg text-gray-800">
              AMA/ACEP E/M Guidelines (2023)
            </h2>
            <p className="text-sm text-gray-600">
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
        </div>
      </div>
    </main>
  );
}
