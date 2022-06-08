import DefaultLayout from "layouts/Default";
import EditProduct from "pages/edit-product";

const indexRoutes = [{ path: "/", component: DefaultLayout }];

const AppRoutes = [
  // TODO: add edit product route here...
  {
    path: "/products/:productId/edit",
    component: EditProduct,
    name: "ProductEdit",
  },
  { path: "/", pathTo: "/products/1/edit", name: "Products", redirect: true },
];

export default AppRoutes;

export { indexRoutes };
