import { cn } from '@/lib/utils'

/**
 * Supporting copy rhythm under principal fold headlines ({@link PRINCIPAL_HEADLINE_CLASSNAME}).
 * Same scale on narrow and wide viewports — matches Fold 1 mobile supporting line globally.
 */

export const PRINCIPAL_SUPPORT_MOBILE_TOP_GAP = 'mt-[calc(0.3rem+2px)]'

export const PRINCIPAL_SUPPORT_MOBILE_BODY = cn(
  'font-sans font-normal',
  'max-w-[20rem]',
  'px-1',
  'text-[calc(0.71rem+1.5px)]',
  'leading-[1.35]',
  'tracking-[0.01em]',
)

export const PRINCIPAL_SUPPORT_MOBILE_COMBINED = cn(PRINCIPAL_SUPPORT_MOBILE_TOP_GAP, PRINCIPAL_SUPPORT_MOBILE_BODY)

/** Top inset for principal-tier headlines below fold chrome — same on mobile and desktop. */
export const PRINCIPAL_HEADLINE_MOBILE_TOP_INSET = 'mt-2'
