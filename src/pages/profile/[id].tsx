/* eslint-disable */
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import { useRouter } from "next/router";
import Head from "next/head";
import { Container } from "@nextui-org/react";
import {
  AtSymbolIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

import { CustomModal, NftCard } from "../../components/index";

const VerNFTs: NextPage = () => {
  const [nfts, SetNfts] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    text: "",
  });

  const router = useRouter();
  const publicKey: any = router.query.id;

  useEffect(() => {
    if (publicKey == null) return;
    const { id } = router.query;
    if (publicKey) {
      fetch("/api/getDocument", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          coll: "users",
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          data
            ? setProfileData(data)
            : setModal({
                ...modal,
                visible: true,
                title: "Error",
                text: "User doesn't exist",
              });
              
          console.log(data);
        }).then(() => {
          fetchNFTs(new PublicKey(publicKey))})
        .catch((error) => console.error(error));
    }
  }, [publicKey]);

  const mx = new Metaplex(new Connection(clusterApiUrl("devnet")));
  const fetchNFTs = async (owner: PublicKey) => {
    try {
      const list: any = await mx.nfts().findAllByOwner({ owner: owner });
      let aux: any = [];
      list.map((e: any) => {
        fetch(e.uri)
          .then((r) => r.json())
          .then((r: any) => {
            aux.push(r);
            SetNfts(aux);
          });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <CustomModal
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
        close={() => setModal({ ...modal, visible: false })}
      />

      {profileData ? (
        <>
          <Head>
            <title>{profileData.name}</title>
          </Head>
          <Container className="p-6">
            <div className="py- px-8 sm:px-40 my-5">
              <h1 className="text-center px-4 sm:px-0 text-3xl sm:text-5xl">
                {profileData.name}
              </h1>
              {profileData.is_company ? (
                <p className="text-center text-gray-500">Company</p>
              ) : (
                ""
              )}
            </div>
            <div className="my-3">
              <hr className="border-1 h-0.5 bg-black" />
            </div>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="llg:justify-between md:w-1/3 mr-4">
                <div className="min-w-0 flex-1">
                  <div className="flew-row lg:basis-3/4 h-auto block mt-5 lg:mt-0 ">
                    <div className="flex justify-start align-start text-left">
                      <p>{profileData.about}</p>
                    </div>
                  </div>
                  <div className="mt-8 lg:mt-14 lg:flex">
                    <div className="lg:inline-grid lg:grid-cols-1 gap-3 grid-rows-3 h-auto">
                      {!profileData.is_company ? (
                        <>
                          <div className=" flex  justify-start align-start">
                            <BriefcaseIcon
                              className="mr-1.5 justify-start h-5 w-5 flex-shrink-0 text-purple"
                              aria-hidden="true"
                            />
                            {profileData.profession}
                          </div>
                          <div className="flex justify-start align-middle">
                            <MapPinIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple"
                              aria-hidden="true"
                            />
                            {profileData.country_residence}
                          </div>
                          <div className="flex justify-start align-middle">
                            <AtSymbolIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple"
                              aria-hidden="true"
                            />
                            {profileData.email}
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-start align-middle">
                          <BuildingOfficeIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple"
                            aria-hidden="true"
                          />
                          {profileData.business_field}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {nfts.length > 0 ? (
                <div className="md:w-1/2">
                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {nfts.map((item: any) => (
                      <NftCard
                        key={nfts.indexOf(item)}
                        title={item.name}
                        image={item.image}
                        description={item.description}
                        symbol={item.symbol}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    This user doesn't seem to have any experience yet.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </>
      ) : (
        <div className="mt-3 text-center py-48">
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-purple-200 animate-spin dark:text-purple-600 fill-white-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerNFTs;
/* eslint-disable */
