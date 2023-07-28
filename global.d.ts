declare global {
   interface Metadata{
    name: string,
    description: string,
    image: string,
    price: string,
    index: index
   }
   interface Ethereum{
      window: {
         ethereum: any
      }
   }
}
export { };