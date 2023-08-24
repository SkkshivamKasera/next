import Image from 'next/image'
import React from 'react'
import loader from '@/img/loading.gif'

const Loader = () => {
  return (
    <div style={{width: '100vw', height: '100vh', position: 'fixed', maxWidth: '100%', display: 'flex', justifyContent: 'center', marginTop: 20}}>
      <Image src={loader} alt='loading_please_wait' width={40} height={40} />
    </div>
  )
}

export default Loader
