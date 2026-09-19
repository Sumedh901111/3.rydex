import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import PartnerDashboard from "@/components/PartnerDashboard"

export default function PartnerPage() {
    return (
        <div className="w-full min-h-screen bg-white">
            <Nav />
            <PartnerDashboard />
            <Footer />
        </div>
    )
}