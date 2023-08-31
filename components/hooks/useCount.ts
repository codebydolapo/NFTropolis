import { nfTropolisAddress } from "../../src/nfTropolisAddress";
import nfTropolisABI from "../../artifacts/contracts/NFTropolis.sol/NFTropolis.json";
import { marketplaceAddress } from "../../src/marketplaceAddress";
import marketplaceABI from "../../artifacts/contracts/Marketplace.sol/Marketplace.json";
import { useEffect } from "react";
import { useContractRead } from "wagmi";

const useCount = () => {
  const {
    data: countData,
    isError: countErrorState,
    isFetching: countFetchingState,
    isLoading: countLoadingState,
  } = useContractRead({
    address: nfTropolisAddress,
    abi: nfTropolisABI.abi,
    functionName: "getMintedTokenCount",
    args: [],
  });

  if (!countFetchingState && !countLoadingState) {
    return {
      data: Number(countData),
      countFetchingState,
      countLoadingState,
    };
  }
};

export default useCount;
