import { Link, LinkProps as PrimerLinkProps } from "@primer/react";
import { LinkProps as NextLinkProps } from "next/dist/client/link";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

export type NextPrimerLinkProps = PropsWithChildren<
  NextLinkProps & Omit<PrimerLinkProps, "as">
>;

export const NextPrimerLink = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...primerProps
}: NextPrimerLinkProps) => {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <Link {...primerProps}>{children}</Link>
    </NextLink>
  );
};
