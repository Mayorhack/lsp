import { sideBardata } from "@/data/sidebardata";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import lsp from "../../images/lsp.webp"

const Sidebar = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMenu(false);
  }, [router]);

  return (
    <>
      <HiMenu
        className="lg:hidden absolute w-5 h-5 left-4 top-2"
        onClick={() => setMenu(true)}
      />
      <div
        className={`fixed  min-h-screen bg-white left-0 px-5 py-4 shadow-lg font-sans font-normal text-lg w-[250px] overflow-y-scroll h-full duration-500 lg:translate-x-0 transition-transform disable  z-20 ${
          menu ? "-translate-x-0 " : "-translate-x-full"
        }`}>
        <Link className=" md:pt-[unset] flex items-center px-4 mt-16" href="/">
          {/* <Image
            src="/svgs/logo2.svg"
            alt="logo"
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          /> */}
          <span className="flex flex-row-reverse justify-center items-center">
            <p className="ml-1 font-normal text-[24px] text-primary">
              Dashboard
            </p>
            <Image src={lsp} alt='lsp_logo' className="w-6 h-6" />
          </span>
        </Link>
        <FiX
          className="lg:hidden absolute w-4 h- right-3 top-3"
          onClick={() => setMenu(false)}
        />
        <div className="flex flex-col font-sans font-normal text-lg justify-between capitalize">
          <ul>
            {sideBardata.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    className={`my-4 flex px-4 py-2 gap-8 items-center ${
                      router.pathname.includes(item.link)
                        ? " bg-primary rounded-lg text-white"
                        : "text-primary"
                    }`}
                    href={item.link}>
                    {item.logo}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p
            className="mt-10 px-4 py-2 flex gap-8 cursor-pointer text-red-500"
            onClick={() => signOut()}
          >
            <MdLogout size={24} />
            Log out
          </p>
        </div>
      </div>
      {menu ? <div onClick={() => setMenu(false)}></div> : null}
    </>
  );
};

export default Sidebar;
