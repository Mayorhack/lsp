import { sideBardata } from "@/data/sidebardata";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import lsp from "../../images/lsp.webp";

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
        }`}
      >
        <Link
          className=" md:pt-[unset]  px-4 mt-10 flex flex-row-reverse justify-center items-center"
          href="/dashboard"
        >
          <span className="">
            <Image
              src={lsp}
              alt="lsp_logo"
              className="w-16 h-16 mx-auto"
              unoptimized
            />
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
                        ? " bg-fadedPrimary rounded-lg  text-primary"
                        : "text-gray-500"
                    }`}
                    href={item.link}
                  >
                    {item.logo}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p
            className="mt-10 px-4 py-2 flex gap-8 cursor-pointer text-red-500"
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
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
