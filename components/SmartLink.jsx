import Link from 'next/link';

// Internal paths ("/events#book") use client-side navigation;
// everything else (tel:, mailto:, external, "#section") stays a plain anchor.
export default function SmartLink({ href, children, ...rest }) {
  if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = typeof href === 'string' && /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}
