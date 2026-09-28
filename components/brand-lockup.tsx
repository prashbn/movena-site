import Image from "next/image";

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLockup({
  className = "",
  priority = false,
}: BrandLockupProps) {
  return (
    <Image
      src="/brand/header-light.svg"
      alt=""
      width={943}
      height={240}
      className={`site-logo__image ${className}`.trim()}
      priority={priority}
    />
  );
}
