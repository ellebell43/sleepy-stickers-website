import Image from "next/image"

export default function Spinner() {
  return (
    <div className="w-full flex items-center justify-center">
      <Image src="/images/spinner.png" alt="spinner" width={32} height={32} className="transition-all animate-spin dark:invert" />
    </div>
  )
}