import Image from "next/image";

export default function Home() {
  return (
    <h1 className="bg-sky-500/10 text-2xl text-red-300 font-bold underline">
      Hello world!
      <Image
        src="/logo.svg"
        alt="Logo"
        width={32}
        height={32}
        className="rounded-full"
      />
    </h1>
  )
}