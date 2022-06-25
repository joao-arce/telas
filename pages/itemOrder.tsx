import { useRouter } from 'next/router';
import { useState } from 'react';
import { ITodo } from '../types/todo';

type Product = {
  id: number;
  name: string;
  price: number;
};

type Item = {
  id?: number;
  service_time: string;
  quantity: number;
  id_user: number;
  id_order: number;
  id_product: number;
  status: string;
  product: Product;
};

// Essa props deverá ser alterada é só de TESTE
type Props = {
  tasks: ITodo[];
};

const ItemOrder = ({ tasks }: Props) => {
  // const [products, setProducts] = useState<Product[]>([]);
  const [itemsProduct, setItemsProduct] = useState<Item[]>([]);

  const formatItemsToSend = () => {
    const itemsTemp = itemsProduct.map((item) => {
      const newItem = {
        id_order: item.id_order,
        id_product: item.id_product,
        id_user: item.id_user,
        service_time: item.service_time,
        quantity: item.quantity,
        status: item.status,
      };

      return newItem;
    });
    // "categories"
    // let aux = '{items:' + itemsTemp + '}';
    let aux = '';
    aux = '"items":' + JSON.stringify(itemsTemp);
    // console.log('formatItemsToSend ', JSON.stringify(aux));

    // return;

    // return 'items:' + JSON.stringify(itemsTemp);
    // return aux;
    return itemsTemp;
  };

  const handleSaveItems = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newsItems = formatItemsToSend();

    // console.log('Vamos gravar');
    // {"categories":

    // console.log('newsItems ', newsItems);
    // return;

    const response = await fetch(
      // item/createMany
      // item/createAndUpdate

      `${process.env.NEXT_PUBLIC_BASE_URL}/item/createAndUpdate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(newsItems),
      }
    );

    if (response.ok) {
      const result = await response.json();
      // console.log('result ', result);
      // props.closeFechamento();
      router.push('/');
    } else {
      console.log('Erro ', await response.json());
    }
  };

  const handleUpdateQuantity = (
    e: React.FormEvent<HTMLButtonElement>,
    itemProduct: Item,
    action: 'plus' | 'minus'
  ) => {
    // console.log('INICIAL ');
    // console.log(itemsProduct);

    const removeItem = (id: number) => {
      const itemFilterd = itemsProduct.filter((item) => item.id !== id);
      setItemsProduct(itemFilterd);
    };

    let newQuantity = itemProduct.quantity;
    if (action === 'plus') {
      newQuantity = newQuantity + 1;
    } else {
      if (itemProduct.quantity === 1) {
        removeItem(itemProduct.id === undefined ? 0 : itemProduct.id);
        return;
      } else {
        newQuantity = itemProduct.quantity - 1;
      }
    }

    const updateItems = itemsProduct.map((item) =>
      item.id === itemProduct.id ? { ...item, quantity: newQuantity } : item
    );
    // console.log({ ...itemProduct, quantity: itemProduct.quantity + 1 });
    // setItemsProduct( { ...itemProduct, quantity: itemProduct.quantity + 1 })
    // console.log('Adicionou ');
    // console.log('newQuantity ', newQuantity);
    setItemsProduct(updateItems);
  };

  const router = useRouter();
  return (
    // <div className="w-full mx-auto px-1 overflow-auto bg-gray-200 rounded-lg">
    //   <div className="text-center mt-2 mb-2">
    //     <h1 className="font-medium">Pedido</h1>
    //   </div>

    //   <table className="table-auto w-full text-left whitespace-no-wrap">
    //     <tbody>
    //       {itemsProduct.map((item) => (
    //         <tr key={item.id}>
    //           <td className="px-1 py-1">{item.product.name}</td>
    //           <td className="px-2 py-1">{item.quantity}</td>
    //           <td>
    //             <button
    //             // onClick={(e) => handleUpdateQuantity(e, item, 'minus')}
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-12 w-12"
    //                 viewBox="0 0 20 20"
    //                 fill="red"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //             </button>
    //           </td>
    //           <td>
    //             <button
    //             // onClick={(e) => handleUpdateQuantity(e, item, 'plus')}
    //             >
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-12 w-12"
    //                 viewBox="0 0 20 20"
    //                 fill="green"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <div className="flex justify-center gap-8 my-3 pb-2">
    //     <button
    //       // onClick={handleSaveItems}
    //       className="rounded-full bg-teal-700 text-white px-4 py-2"
    //     >
    //       Confirmar
    //     </button>
    //     <button
    //       onClick={(e) => router.push('/')}
    //       className="rounded-full bg-gray-700 text-white px-4 py-2"
    //     >
    //       Cancelar
    //     </button>
    //   </div>
    // </div>

    <div className="max-w-2xl mx-auto bg-white p-4">
      <div>
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="grid grid-cols-4 justify-between items-center"
          >
            <p className="col-span-2">{task.title}</p>
            <p className="text-center">04</p>
            <div className="flex justify-center items-center">
              <button
              // onClick={(e) => handleUpdateQuantity(e, item, 'minus')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="red"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                // onClick={(e) => handleUpdateQuantity(e, item, 'plus')}
                className="px-0 py-1  text-gray-100 bg-emerald-600 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="col-span-full justify-center mt-2">
              <div className="flex justify-center gap-8 my-3 pb-2">
                <button
                  // onClick={handleSaveItems}
                  className="rounded-full bg-teal-700 text-white px-4 py-2"
                >
                  Confirmar
                </button>
                <button
                  onClick={(e) => router.push('/')}
                  className="rounded-full bg-gray-700 text-white px-4 py-2"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemOrder;
