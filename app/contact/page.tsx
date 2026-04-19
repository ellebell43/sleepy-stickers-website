'use client'

import { SubmitEvent } from "react"

export default function Page() {

  const submit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const replyEmail = e.target.email.value
    const emailBody = e.target.message.value
    // fetch("/contact/api")
  }

  return (
    <section>
      <form onSubmit={(e) => { submit(e) }}>
        <div className="relative">
          <label htmlFor="email" className="block">Your Email</label>
          <input id="email" type="email" required={true} placeholder="example@email.com" />
        </div>
        <div className="relative">
          <label htmlFor="message" className="block">message</label>
          <input id="message" type="text-area" required={true} placeholder="Your message" className="border-4 shadow-lg p-4 w-full h-50 flex" />
        </div>
        <button type="submit" id="submit-button">Send!</button>
      </form>
    </section>
  )
}