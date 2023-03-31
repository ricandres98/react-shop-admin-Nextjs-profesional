import FormProduct from "common/FormProduct";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import endPoints from "services/api";
import { AuthContext } from "hooks/useAuth";
import Cookies from "js-cookie";

const Edit = () => {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const { id } = router.query;
    async function getProduct() {
      try {
        const response = await axios.get(
          endPoints.products.getProduct(id)
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (router?.isReady) {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
      } else {
        getProduct();
      }
    }
  }, [router?.isReady]);

  return user ? <FormProduct product={product} /> : undefined;
};

export default Edit;
