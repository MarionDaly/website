import React, { useEffect, useState } from "react"

/*
 * Shows the contact email without putting it in the site's HTML or JavaScript,
 * so spam bots that scan pages can't collect it.
 *
 * The address is stored base64-encoded. To change it, run:
 *   node -e "console.log(Buffer.from('name@example.com').toString('base64'))"
 * and paste the result into ENCODED_ADDRESS below.
 */
const ENCODED_ADDRESS = `TWFyaW9uQE1ha2VOb01pc3Rha2VzQUkuY29t`
const SUBJECT = `Hello from makenomistakesai.com`

const decode = () => atob(ENCODED_ADDRESS)

// "name [at] example [dot] com": readable by people, ignored by most bots
const obfuscate = address => {
  const [user, domain] = address.split(String.fromCharCode(64))
  const dot = domain.lastIndexOf(`.`)
  return `${user} [at] ${domain.slice(0, dot)} [dot] ${domain.slice(dot + 1)}`
}

const EmailLink = ({ className }) => {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    setAddress(decode())
  }, [])

  if (!address) {
    // Server-rendered text (also what visitors without JavaScript see)
    return <span className={className}>{obfuscate(decode())}</span>
  }

  return (
    <a
      className={className}
      href={`mailto:${address}?subject=${encodeURIComponent(SUBJECT)}`}
    >
      {address}
    </a>
  )
}

export default EmailLink
