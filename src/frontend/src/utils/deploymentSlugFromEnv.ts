import { getSafeDeploymentSlug, type SlugValidationResult } from './deploymentSlug';

/**
 * Reads deployment slug from environment/configuration and returns a guaranteed-safe slug.
 * This utility ensures the build/deploy workflow always gets a compliant slug value.
 * 
 * Priority order:
 * 1. VITE_DEPLOYMENT_SLUG environment variable
 * 2. document.title (if available)
 * 3. Default fallback: 'birthday-celebration'
 */
export function getDeploymentSlugFromEnv(): SlugValidationResult {
  // Try environment variable first (build-time)
  const envSlug = import.meta.env.VITE_DEPLOYMENT_SLUG;
  if (envSlug && typeof envSlug === 'string') {
    const result = getSafeDeploymentSlug(envSlug);
    if (result.wasModified) {
      console.warn(
        `[Deployment] VITE_DEPLOYMENT_SLUG was sanitized: "${envSlug}" → "${result.slug}"`
      );
    }
    return result;
  }

  // Try document title (runtime)
  if (typeof document !== 'undefined' && document.title) {
    const result = getSafeDeploymentSlug(document.title);
    if (result.wasModified) {
      console.info(
        `[Deployment] Document title was sanitized for slug: "${document.title}" → "${result.slug}"`
      );
    }
    return result;
  }

  // Fallback to default
  return getSafeDeploymentSlug();
}

/**
 * Convenience function that returns just the slug string
 */
export function getDeploymentSlug(): string {
  return getDeploymentSlugFromEnv().slug;
}
