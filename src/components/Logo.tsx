import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className={`flex items-center absolute left-0 `}></div>
    </Link>
  );
};

export default Logo;
