export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-6">
      <h1 className="text-5xl font-bold tracking-tight">404</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl">The page you are looking for doesn&apos;t exist or was moved. Check the URL or return to the homepage.</p>
      <a href="/" className="btn-primary">Go Home</a>
    </div>
  );
}
