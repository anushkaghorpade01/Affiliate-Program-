export type SocialProofItem = {
  title: string
  meta: string
}

export type TrackItem = {
  title: string
  copy: string
  /** Overrides `copy` on mobile — desktop keeps `copy`. */
  mobileCopy?: string
  image?: {
    src: string
    alt: string
  }
}
