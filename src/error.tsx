'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado 😢</h2>
      <p className="mb-6 text-gray-600">{error.message || 'Erro desconhecido.'}</p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}