import router from 'next/router'
import React, { useEffect, useState, useContext } from 'react'

export default function Home() {
  const [login, setLogin] = useState<boolean>(false)

  useEffect(() => {
    if (!login) {
      router.push('/signUp')
    } else {
      router.push('/liveChat')
    }
  }, [])

  return <div>Home</div>
}
