/* eslint-disable */
import  { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Container, Grid } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { NftCard, ModalLoader, CustomModal } from "~/components/index";
import { useRouter } from "next/router";

const Mint: NextPage = () => {
  const { publicKey} = useWallet();
  const [loading, setLoading] = useState(false);
  const [isValidProfile, setIsValidProfile]= useState(false);
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
    close: () => setModal({...modal, visible: false}),
  });
  const router = useRouter();
  const created = () => {
    setModal({ ...modal, visible: false });router.push("/dashboard"); setLoading(true)
  }
  useEffect(() => {
    if (publicKey == null) return
    const _publicKey = sessionStorage.getItem("publicKey");
    const isCompany = sessionStorage.getItem("isCompany")
    if(isCompany!="true"){ router.push("/") }
    if (publicKey.toBase58() != _publicKey){
      setModal({
        visible: true,
        title: "Error",
        text: "The wallet has been changed, plase use the owner's wallet to continue",
        close: () => setModal({ ...modal, visible: false }),
      })
      setIsValidProfile(false)
    }else{
      setIsValidProfile(true)
      setFormData((prevData) => ({
        ...prevData,
        "companyID": publicKey.toBase58(),
      }));
    }
    setLoading(false);
    
  }, [publicKey]);
  const [formData, setFormData] = useState({
    nftName: "",
    nftDesc: "",
    nftSymbol: "",
    nftImage:
      "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg",
    companyID: "",
  });

  const handleInputChange = ({ target }: any) => {
    const { name, value } = target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log(formData);
    if(formData.companyID == "") return;
    const res = await fetch("/api/postJsonMetadata", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setModal({
          visible: true,
          title: "Success",
          text: "Template created successfully",
          close: () => created(),
        })
      })
      .catch(() => {
        setModal({
          visible: true,
          title: "Error",
          text: "An error occurred while creating the template",
          close: () => setModal({ ...modal, visible: false }),
        })
      });
    setLoading(false);
  };

  return (
    
    <>
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={modal.close}
      />

      <Head>
        <title>Create a new template</title>
      </Head>
      {isValidProfile ? (
        <Container className="p-3">
          <div className="py-10 px-8 sm:px-40">
            <h1 className="text-center px-4 sm:px-0 text-3xl sm:text-5xl">
              Create a new <span className="text-purple">template</span>
            </h1>
          </div>
          <div className="my-3">
            <hr className="border-1 h-0.5 bg-black" />
          </div>

          <form
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
          >
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="md:w-1/2 mr-4">
                <label
                  htmlFor="population_registry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  placeholder={"Give your template a title"}
                  className="mb-4 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  onChange={handleInputChange}
                  required
                  name="nftName"
                />
                <label
                  htmlFor="population_registry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <input
                  placeholder={"Put a little description"}
                  className="mb-4 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  onChange={handleInputChange}
                  required
                  name="nftDesc"
                />

                <label
                  htmlFor="population_registry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Symbol
                </label>
                <input
                  placeholder={"Put a symbol for your template"}
                  className="mb-4 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  onChange={handleInputChange}
                  required
                  name="nftSymbol"
                />

                <label
                  htmlFor="population_registry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  placeholder={"Put the link of your image"}
                  className="mb-4 w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  onChange={handleInputChange}
                  required
                  name="nftImage"
                />
              </div>
              <div className="md:w-1/2">
                <NftCard
                  title={formData.nftName}
                  image={formData.nftImage}
                  description={formData.nftDesc}
                  symbol={formData.nftSymbol}
                />
              </div>
            </div>
            <div className="px-4 py-3 text-center sm:px-6">
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
                  w-100
                  flex justify-center
                "
                type="submit"
              >
                <p>Create</p>
              </button>
            </div>
          </form>

          <Grid.Container gap={2} justify="center"></Grid.Container>
          <ModalLoader loading={loading} />
        </Container>
      ) : (
        null
      )}
    </>
  );
};

export default Mint;
/* eslint-disable */
