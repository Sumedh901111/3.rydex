import { auth } from "@/auth"
import connectDb from "@/lib/db"
import Booking from "@/models/booking.model"
import User from "@/models/user.model"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    try {
         await connectDb()
        const session = await auth()
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "unauthorized" }
                , { status: 401 }
            )
        }

        const { bookingId } = await req.json()
        if (!bookingId || !mongoose.isValidObjectId(String(bookingId))) {
            return NextResponse.json({ message: "Invalid booking id" }, { status: 400 })
        }

        const currentUser = await User.findOne({ email: session.user.email }).select("_id")
        if (!currentUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const booking = await Booking.findById(bookingId).populate("user vehicle driver")
        if (!booking) {
            return NextResponse.json({ message: "Ride not found" }, { status: 404 })
        }

        if (String(booking.user?._id ?? booking.user) !== String(currentUser._id)) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        return NextResponse.json(booking, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: `get active ride user error ${error}` }
                , { status: 500 }
            )
    }
}