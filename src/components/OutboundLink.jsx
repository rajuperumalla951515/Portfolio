import { recordOutboundClick, resolveExternalDestination } from '../utils/outboundRedirect';

/**
 * Reusable first-party outbound redirect link:
 * Renders an accessible link routed through /go/:slug with UTM attribution,
 * noopener security, and non-blocking click tracking.
 */
export const OutboundLink = ({
  resource,
  children,
  className = '',
  target = '_blank',
  isAffiliate = false,
  onClick,
  ...props
}) => {
  if (!resource) return null;

  const slug = resource.slug;
  const goUrl = `/go/${slug}`;
  const externalDest = resolveExternalDestination(resource);

  const handleClick = (e) => {
    // Record click asynchronously without blocking browser navigation
    if (externalDest) {
      recordOutboundClick(resource, externalDest);
    }
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const relAttribute = isAffiliate || resource.isAffiliate
    ? 'sponsored noopener noreferrer'
    : 'noopener noreferrer';

  return (
    <a
      href={goUrl}
      target={target}
      rel={relAttribute}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default OutboundLink;
