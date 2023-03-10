import { Container, Text } from "@nextui-org/react";
import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { CustomModal } from "../../components/index";
import { useRouter } from "next/router";
import ModalLoader from "./../../components/ModalLoader";

const Mint: NextPage = () => {
  const [wallet, setWallet] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
  });
  const router = useRouter();

  useEffect(() => {
    const publicKey = sessionStorage.getItem("publicKey");
    //si no hay pubkey, o si la que hay no esta registrada como empresa

    const isCompany = sessionStorage.getItem("isCompany");

    //si no hay pubkey, o si la que hay no esta registrada como empresa
    if (!publicKey || isCompany == "false") {
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    console.log(wallet);
    fetch("/api/linkEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: wallet,
        // TODO: Añadir de public
        companyID: sessionStorage.getItem("publicKey"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.Status === "Failed") {
          setModal({ ...modal, title: "Error", text: data.Message });
        } else {
          setModal({
            ...modal,
            title: "Success",
            text: "User registeres un your company successfully",
          });
          router.push("/dashboard/");
        }
        // TODO: Enviar a index para q vea su empleado nvo o mostrar un modal no c
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = ({ target }: any) => {
    setWallet(target.value);
  };

  return (
    <>
      <Head>
        <title>New employee</title>
      </Head>

      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={() => setModal({ ...modal, visible: false })}
      />
      {isLoggedIn ? (
        <Container className="p-3">
          <div className="py-10 px-8 sm:px-40">
            <h1 className="text-center px-4 sm:px-0 sm:text-5xl">
              Add an <span className="text-purple">employee</span> to your
              company
            </h1>
          </div>
          <div className="my-3">
            <hr className="border-1 h-0.5 bg-black" />
          </div>
          <div className="text-center my-5">
            <div className="">
              <Text>
                Before you start giving certifications to your employees you
                must register in your organization. Remember your employee must
                be registered to Kawi to do this.
              </Text>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="flex justify-center my-5">
                <div className=" mt-5 w-3/4 col-span-6 sm:col-span-3">
                  <label
                    htmlFor="wallet"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Wallet
                  </label>
                  <input
                    type="text"
                    name="wallet"
                    id="wallet"
                    placeholder="Your employee's wallet"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button
                className="
                inline-flex
                items-center
                rounded-full
                px-10
                py-3
                text-sm
                font-medium
                shadow-sm
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2
                bg-teal
                hover:bg-teal-900
                focus:ring-teal-500
                text-white
                border-transparent
                w-60
                flex justify-center
            "
                type="submit"
              >
                <span>Register</span>
              </button>
            </form>
          </div>
        </Container>
      ) : (
        <ModalLoader loading={true} />
      )}
    </>
  );
};

export default Mint;
