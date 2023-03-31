import endPoints from "services/api";
import Pagination from "components/Pagination";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "common/Chart";
import { AuthContext } from "hooks/useAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const PRODUCT_LIMIT = 5;
const PRODUCT_OFFSET = 0;

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [Totalproducts, setTotalProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        (async function () {
          const { data } = await axios.get(
            endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET)
          );
          setProducts(data);
        })();
        (async function () {
          const { data } = await axios.get(
            endPoints.products.getProducts(0, PRODUCT_OFFSET)
          );
          setTotalProducts(data);
        })();
      }
    }
  }, [router.isReady]);
  console.log(products);

  const categoryName = Totalproducts?.map((product) => product.category);
  const categoryCount = categoryName?.map((category) => category.name);
  const countOcurrences = (arr) =>
    arr.reduce((prev, curr) => {
      prev[curr] ? (prev[curr] += 1) : (prev[curr] = 1);
      return prev;
    }, {});
  console.log(countOcurrences(categoryCount));

  console.log(categoryCount, categoryName);
  const data = {
    datasets: [
      {
        label: "Categories",
        data: countOcurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: [
          "#ffbb11",
          "#c0c0c0",
          "#50af95",
          "#F3Ba2F",
          "#2a71d0",
        ],
      },
    ],
  };

  return (
    <>
      {user ? (
        <>
          <Chart chartData={data} className="mb-8 mt-2" />
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Id
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products?.map((product) => (
                        <tr key={`Product-item-${product.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={product.images[0]}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.title}
                                </div>{" "}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.category.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {product.price}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="/edit"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="/edit"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            limit={PRODUCT_LIMIT}
            offset={PRODUCT_OFFSET}
            setProducts={setProducts}
            products={products}
          />
        </>
      ) : undefined}
    </>
  );
}
