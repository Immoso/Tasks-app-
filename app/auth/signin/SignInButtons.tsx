import { signIn } from 'next-auth/react';

interface Provider {
  id: string;
  name: string;
}

interface SignInButtonsProps {
  providers: Record<string, Provider> | null;
}

export default function SignInButtons({ providers }: SignInButtonsProps) {
  if (!providers) return null;

  return (
    <div className="space-y-4">
      {Object.values(providers).map((provider) => (
        <button
          key={provider.id}
          onClick={() => signIn(provider.id)}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}