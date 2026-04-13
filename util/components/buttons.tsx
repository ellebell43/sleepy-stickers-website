import Image from "next/image"

export const IncreaseButton = (props: { canIncrease: boolean, onIncrease: Function, size: number, styling?: string }) => {
  const { canIncrease, onIncrease, size, styling } = props
  return (
    <button
      onClick={() => {
        if (canIncrease) onIncrease()
      }}
      disabled={!canIncrease}
      className={`${!canIncrease ? "opacity-30 hover:opacity-30" : ""} dark:invert ${styling}`}
    >
      <Image src="/images/plus.png" alt="plus icon" height={size} width={size} />
    </button>
  )
}

export const DecreaseButton = (props: { canDecrease: boolean, onDecrease: Function, size: number, styling?: string }) => {
  const { canDecrease, onDecrease, size, styling } = props
  return (
    <button
      onClick={() => {
        if (canDecrease) onDecrease()
      }}
      disabled={!canDecrease}
      className={`${!canDecrease ? "opacity-30 hover:opacity-30" : ""} dark:invert ${styling}`}
    >
      <Image src="/images/minus.png" alt="minus icon" height={size} width={size} />
    </button>
  )
}

export const TrashButton = (props: { canTrash: boolean, onTrash: Function, size: number, styling?: string }) => {
  const { canTrash, onTrash, size, styling } = props
  return (
    <button
      onClick={() => {
        if (canTrash) onTrash()
      }}
      disabled={!canTrash}
      className={`${!canTrash ? "opacity-30 hover:opacity-30" : ""} dark:invert ${styling}`}
    >
      <Image src="/images/trash.png" alt="trash icon" height={size} width={size} />
    </button>
  )
}
