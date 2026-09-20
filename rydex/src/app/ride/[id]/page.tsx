'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

const isValidObjectId = (value: string) => /^[0-9a-fA-F]{24}$/.test(value)

export default function RideLegacyRedirectPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!id) {
      router.replace('/user/bookings')
      return
    }

    if (!isValidObjectId(id)) {
      router.replace('/user/bookings')
      return
    }

    router.replace(`/user/ride/${id}`)
  }, [id, router])

  return (
    <div className='flex h-screen w-full items-center justify-center bg-zinc-100 px-4'>
      <div className='w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm'>
        <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-white'>
          ...
        </div>
        <h1 className='text-2xl font-black text-zinc-900'>Redirecting ride</h1>
        <p className='mt-3 text-sm text-zinc-500'>Opening the correct booking page for your trip.</p>
      </div>
    </div>
  )
}
