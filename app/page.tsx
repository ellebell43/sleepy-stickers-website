import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full">
        <Image src="/images/sleepy-stickers-logo.png" alt="Sleepy stickers logo. A pixel art red panda splooted and sleeping on a branch with a green circle as a background with the edges of the subject poking out. The pixel canvas is 64x64" width={64 * 5} height={64 * 5} loading="eager" />
        <h1 className="text-center text-6xl">Sleepy Stickers</h1>
        <p className="text-center mt-4">Wow! You're here early! I'm still working on the site and there isn't anything to see yet. Come back later!</p>
      </div>
    </div>
  );
}
