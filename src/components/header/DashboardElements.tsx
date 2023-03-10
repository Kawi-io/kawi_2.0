import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CustomModal } from "../index";

interface DashboardElementsProps {
  mobile?: boolean;
  isCompany: boolean;
}

/**
 * TODO:
 *
 * x Obtener iconos segun si es company o no
 * x Links para mobile
 * x Redirección a perfil propio
 * - Cerrar sesión
 */

// ya c que esta feo pero tenia sueño

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const DashboardElements = ({
  mobile = false,
  isCompany,
}: DashboardElementsProps) => {
  const router = useRouter();
  const [wallet, setWallet] = useState<string>();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
    close,
  });

  const logout = (event: any) => {
    event.preventDefault();

    sessionStorage.removeItem("publicKey");
    sessionStorage.removeItem("isCompany");

    setModal({
      visible: true,
      title: "Success",
      text: "You have been logged out",
      close: () => {
        if(router.pathname="/"){
          window.location.reload();
        }else{
          router.push("/");
        }
      },
    });
  };

  const tabs = [
    {
      name: "Home",
      href: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      name: "Mint",
      href: "/dashboard/mint",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Add",
      href: "/dashboard/new",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      ),
    },
    {
      name: "Profile",
      href: `/profile/${wallet}`,
      user: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (sessionStorage.getItem("publicKey")) {
      setWallet(sessionStorage.getItem("publicKey")!);
    }
  }, [sessionStorage]);

  const filteredTabs = isCompany ? tabs.filter((tab) => tab.user) : tabs;

  if (!mobile) {
    return (
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <CustomModal
          visible={modal.visible}
          title={modal.title}
          text={modal.text}
          close={modal.close}
        />
        <div>
          <div className="hidden sm:block">
            <nav className="isolate flex divide-x rounded-lg" aria-label="Tabs">
              {filteredTabs.map((tab, tabIdx) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    router.pathname === tab.href
                      ? "text-teal-900"
                      : "text-gray-500 hover:text-gray-700",
                    tabIdx === 0 ? "rounded-l-lg" : "",
                    tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                  )}
                  aria-current={router.pathname === tab.href}
                >
                  {tab.icon}
                  <span
                    aria-hidden="true"
                    className={classNames(
                      router.pathname === tab.href
                        ? "bg-teal-500"
                        : "bg-transparent",
                      "absolute inset-x-0 bottom-0 h-0.5"
                    )}
                  />
                </Link>
              ))}
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={modal.close}
      />
      {tabs.map((tab: any) => (
        <Link
          key={tab.name}
          scroll={false}
          href={tab.href}
          onClick={tab.event}
          className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
        >
          {tab.name}
        </Link>
      ))}

      <button
        onClick={logout}
        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
        {" "}
        Logout
      </button>
    </>
  );
};
