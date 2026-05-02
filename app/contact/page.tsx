'use client'

import Spinner from "@/util/components/spinner"
import { SubmitEvent, useEffect, useState } from "react"

export default function Page() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [reqComplete, setReqComplete] = useState(false)

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    const res = await fetch("/contact/api", {
      method: "POST",
      body: JSON.stringify({ email, message, name })
    })
    if (res.status !== 200) {
      setError(`Error: ${res.status}. ${res.statusText}`)
      setPending(false)
    } else {
      setReqComplete(true)
      setPending(false)
    }
  }

  return (
    <section>
      <h1 className="mb-8">Contact me</h1>
      <form onSubmit={(e) => { submit(e) }} className="flex flex-col justify-center items-center mx-auto gap-6 w-full" >
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-250 mx-auto">
          <div className="relative w-full max-w-100 mx-auto">
            <label htmlFor="email" className={`absolute bg:gray-50 dark:bg-stone-950 px-2 transition-all duration-250 ${name ? "-top-3" : "top-4"} left-4`}>Name</label>
            <input id="name" type="text" required={true} value={name} onChange={(e) => { e.preventDefault; setName(e.target.value) }} className="block border-4 shadow-lg py-2 px-4 w-full" />
          </div>
          <div className="relative w-full max-w-100 mx-auto">
            <label htmlFor="email" className={`absolute bg:gray-50 dark:bg-stone-950 px-2 transition-all duration-250 ${email ? "-top-3" : "top-4"} left-4`}>Email</label>
            <input id="email" type="email" required={true} value={email} onChange={(e) => { e.preventDefault; setEmail(e.target.value) }} className="block border-4 shadow-lg py-2 px-4 w-full" />
          </div>
        </div>
        {/* <div className="flex justify-center w-full"> */}
        <div className="relative w-full max-w-227 mx-auto">
          <label htmlFor="message" className={`absolute bg:gray-50 dark:bg-stone-950 px-2 transition-all duration-250 ${message ? "-top-3" : "top-4"} left-4`}>Message</label>
          <textarea id="message" maxLength={2000} required={true} value={message} onChange={(e) => { e.preventDefault; setMessage(e.target.value) }} className="block border-4 shadow-lg p-4 w-full h-75" />
        </div>
        {/* </div> */}
        {pending ? <Spinner /> :
          error ? <p className="border-4 p-4 text-2xl">{error}</p> :
            reqComplete ? <p className="border-4 py-4 px-8 text-2xl dark:bg-(--fern-dark) bg-(--fern)">Message sent!</p> :
              <button type="submit" id="submit-button" className="bg-accent border-4 px-20 py-4 text-2xl">Send!</button>}
      </form>
    </section>
  )
}