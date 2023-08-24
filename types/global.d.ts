type Description = {
  children: {
    text?: string;
  };
  _type: "block";
}

type Image = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

declare global {
   interface Metadata {
      // nfts: {
        description?: Description | string;
        price?: null | number;
        image?: Image | undefined;
        url?:{
         current: string;
        };
        name?: {
         string;
        };
        external_url?: string
      // }
    }[]
}



export {}