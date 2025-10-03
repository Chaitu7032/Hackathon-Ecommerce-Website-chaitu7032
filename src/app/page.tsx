import Image from "next/image";
import dynamic from "next/dynamic";
import Hero from "./component/hero";
import Card1 from "./component/card1";
import Product from "./component/product";
import MainLayout from "./component/MainLayout";

// Dynamically load below-the-fold sections to reduce First Load JS
const ProductTwo = dynamic(() => import('./component/product2'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-neutral-200/40 dark:bg-neutral-700/40 rounded" aria-label="Loading product section" />,
  ssr: true,
});
const SignUp = dynamic(() => import('./component/signup'), {
  loading: () => <div className="h-72 w-full animate-pulse bg-neutral-200/40 dark:bg-neutral-700/40 rounded" aria-label="Loading signup" />,
  ssr: true,
});
const CardLast = dynamic(() => import('./component/lastcard'), {
  loading: () => <div className="h-80 w-full animate-pulse bg-neutral-200/40 dark:bg-neutral-700/40 rounded" aria-label="Loading collection" />,
  ssr: true,
});

export default function Home() {
  return (
    <MainLayout>
      <div>
        <Hero />
        <Card1 />
        <Product />
        <ProductTwo />
        <SignUp />
        <CardLast />
      </div>
    </MainLayout>
  );
}
