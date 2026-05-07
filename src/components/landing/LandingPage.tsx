import { ApplicationFold } from '@/components/landing/folds/ApplicationFold'
import { CinematicStatement } from '@/components/landing/folds/CinematicStatement'
import { Footer } from '@/components/landing/folds/Footer'
import { HeroSection } from '@/components/landing/folds/HeroSection'
import { InteractiveTracks } from '@/components/landing/folds/InteractiveTracks'
import { RewardsOrbit } from '@/components/landing/folds/RewardsOrbit'
import { SocialProofWall } from '@/components/landing/folds/SocialProofWall'
import { TastemakersWall } from '@/components/landing/folds/TastemakersWall'

export function LandingPage() {
  return (
    <main className="bg-[#000d09]">
      <HeroSection />
      <SocialProofWall />
      <RewardsOrbit />
      <InteractiveTracks />
      <CinematicStatement />
      <TastemakersWall />
      <ApplicationFold />
      <Footer />
    </main>
  )
}
