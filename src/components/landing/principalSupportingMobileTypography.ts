import { cn } from '@/lib/utils'

/**
 * Mobile-first supporting copy rhythm under principal fold headlines ({@link PRINCIPAL_HEADLINE_CLASSNAME}).
 * Excludes Fold 6 (TastemakersWall — custom headline scale). Desktop styles remain per-component.
 */

/** Margin from headline to supporting line (narrow viewports only). */
export const PRINCIPAL_SUPPORT_MOBILE_TOP_GAP = 'max-md:mt-[calc(0.3rem+2px)]'

/** Type size, measure, and line rhythm matching Fold 1 mobile supporting line (narrow viewports only). */
export const PRINCIPAL_SUPPORT_MOBILE_BODY = cn(
  'max-md:font-sans max-md:font-normal',
  'max-md:max-w-[20rem]',
  'max-md:px-1',
  'max-md:text-[calc(0.71rem+1.5px)]',
  'max-md:leading-[1.35]',
  'max-md:tracking-[0.01em]',
)

/** Canonical pair: headline → supporting spacing + body scale (narrow viewports only). */
export const PRINCIPAL_SUPPORT_MOBILE_COMBINED = cn(PRINCIPAL_SUPPORT_MOBILE_TOP_GAP, PRINCIPAL_SUPPORT_MOBILE_BODY)

/** Optional top inset for principal-tier headlines below fold chrome — used on folds 2+, not Hero (uses `mt-2`). */
export const PRINCIPAL_HEADLINE_MOBILE_TOP_INSET = 'max-md:mt-2'
