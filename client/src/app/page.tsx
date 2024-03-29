import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-custom-cream">
    <div className="w-full max-w-[960px] mx-auto flex justify-center">
      <Image
        src="/banner.png"
        alt="description"
        width={500}
        height={300}
        layout="responsive"
      />
    </div>
    <div className="text-center">
      <h1 className="text-6xl font-bold text-custom-darkorange mb-6">Welcome to my Todo App</h1>
      <div className="flex justify-center space-x-4">
        <Link href="/login" className="text-xl text-custom-pink hover:text-custom-orange transition duration-300">
          Login
        </Link>
      </div>
    </div>
  </div>

  );
}
