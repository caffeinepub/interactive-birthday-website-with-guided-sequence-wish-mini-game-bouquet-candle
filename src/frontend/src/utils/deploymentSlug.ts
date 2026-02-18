/**
 * Validates and sanitizes deployment slugs to meet platform requirements:
 * - Length: 5-50 characters
 * - Allowed characters: A-Z, a-z, 0-9, hyphen (-)
 * - No spaces, underscores, emojis, or special characters
 */

export interface SlugValidationResult {
  isValid: boolean;
  slug: string;
  originalInput?: string;
  wasModified: boolean;
}

/**
 * Validates if a string is a valid deployment slug
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || slug.length < 5 || slug.length > 50) {
    return false;
  }
  // Only letters, numbers, and hyphens allowed
  return /^[A-Za-z0-9-]+$/.test(slug);
}

/**
 * Sanitizes a string to create a valid deployment slug
 * - Converts to lowercase
 * - Replaces spaces and underscores with hyphens
 * - Removes emojis and special characters
 * - Normalizes consecutive hyphens to single hyphen
 * - Trims hyphens from start/end
 * - Ensures length is between 5-50 characters
 */
export function sanitizeSlug(input: string): string {
  let slug = input
    .toLowerCase()
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove all characters except letters, numbers, and hyphens
    .replace(/[^a-z0-9-]/g, '')
    // Normalize consecutive hyphens to single hyphen
    .replace(/-+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, '');

  // Ensure minimum length
  if (slug.length < 5) {
    slug = 'birthday-celebration';
  }

  // Ensure maximum length
  if (slug.length > 50) {
    slug = slug.substring(0, 50).replace(/-+$/, '');
  }

  return slug;
}

/**
 * Gets a safe deployment slug, with fallback to default
 * Returns a guaranteed-valid slug and diagnostic information
 */
export function getSafeDeploymentSlug(input?: string): SlugValidationResult {
  const defaultSlug = 'birthday-celebration';
  
  if (!input || input.trim() === '') {
    return {
      isValid: true,
      slug: defaultSlug,
      wasModified: false
    };
  }

  const originalInput = input;
  const sanitized = sanitizeSlug(input);
  const isValid = isValidSlug(sanitized);
  
  if (isValid) {
    return {
      isValid: true,
      slug: sanitized,
      originalInput,
      wasModified: sanitized !== originalInput
    };
  }

  // If sanitization still didn't produce a valid slug, use default
  return {
    isValid: false,
    slug: defaultSlug,
    originalInput,
    wasModified: true
  };
}
