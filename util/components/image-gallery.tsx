import Image from "next/image";

export default function ImageGallery(props: { images: string[], alts: string[] }) {
  const { images, alts } = props
  //             <Image src={`/products/${getSelectedProduct().id}.png`} alt={getSelectedProduct().description} height={256} width={256} className="mb-4 mx-auto" loading="eager" />

  return (
    <div className="mb-4">
      {images.map((el: string, i: number) => {
        return (
          <Image key={i} src={el} alt={alts[i]} width={256} height={256} loading={i == 0 ? "eager" : "lazy"} />
        )
      })}
    </div>
  )
}