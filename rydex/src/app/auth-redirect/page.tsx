'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthRedirectPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return

        if (status !== "authenticated") {
            router.replace("/")
            return
        }

        const destination = session.user.role === "admin"
            ? "/admin"
            : session.user.role === "partner"
                ? "/partner"
                : "/user/book"

        router.replace(destination)
    }, [router, session, status])

    return null
}