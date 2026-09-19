import { auth } from "@/auth"
import connectDb from "@/lib/db"
import User from "@/models/user.model"

export async function requireAdmin() {
    const session = await auth()

    if (!session?.user?.email) {
        return { response: Response.json({ message: "unauthorized" }, { status: 401 }) }
    }

    await connectDb()

    const adminUser = await User.findOne({
    email: session.user.email
}).select("_id email role")

console.log("[ADMIN AUTH DEBUG]", {
    sessionEmail: session.user.email,
    dbEmail: adminUser?.email ?? null,
    dbRole: adminUser?.role ?? null
})

if (!adminUser || adminUser.role !== "admin") {
    return {
        response: Response.json(
            {
                message: "forbidden",
                sessionEmail: session.user.email,
                dbEmail: adminUser?.email ?? null,
                dbRole: adminUser?.role ?? null
            },
            { status: 403 }
        )
    }
}
    return { user: adminUser }
}