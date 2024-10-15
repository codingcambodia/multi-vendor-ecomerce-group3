import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import styles from "../../styles/styles";

import BeatLoader from "react-spinners/BeatLoader";
import { useGetProductById } from "../../api/product/use-get-product-by-id";
import Loader from "../Layout/Loader";
import { useUpdateProduct } from "../../api/product/use-update-product";

const UpdateProduct = ({ closeDrawer, id }) => {
  const { seller } = useSelector((state) => state.seller);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  const { isPending, data } = useGetProductById(id);
  const { isPending: updatePending, mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    if (data) {
      setName(data?.product?.name)
      setCategory(data?.product?.category)
      setDescription(data?.product?.description)
      setTags(data?.product?.tags)
      setOriginalPrice(data?.product?.originalPrice)
      setDiscountPrice(data?.product?.discountPrice)
      setStock(data?.product?.stock)

      let imges = data?.product?.images;

      let newImages = imges?.map((img) => {
        return img?.url
      })
      setImages(newImages)

      // setImages(data?.product?.images)
      // handleImageChange(data?.product?.images)
    }
  }, [])


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();



      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    updateProduct({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images,
      _id: data?.product._id
    }, {
      onSuccess: () => {
        toast.success("Product updated successfully!");
        closeDrawer()
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      }
    }
    )
  };



  return (
    <>

      {isPending ? <Loader /> :

        <div className="w-full">
          <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
          {/* create product form */}
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <label className="pb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your product name..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                cols="30"
                required
                rows="4"
                type="text"
                name="description"
                value={description}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your product description..."
              ></textarea>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose a category">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <label className="pb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={tags}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter your product tags..."
              />
            </div>
            <br />
            <div className="flex items-center justify-between">
              <div>
                <label className="pb-2">Original Price</label>
                <input
                  type="number"
                  name="price"
                  value={originalPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="Enter your product price..."
                />
              </div>

              <div>
                <label className="pb-2">
                  Price (With Discount) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={discountPrice}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="Enter your product price with discount..."
                />
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter your product stock..."
              />
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                </label>
                {images &&
                  images.map((i) => (
                    <img
                      src={i}
                      key={i}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  ))}
              </div>
              <br />
              <div>
                <button disabled={updatePending}
                  type="submit"
                  className="group relative w-full h-[40px] flex gap-x-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#288b4c]"
                > Update Product
                  <BeatLoader color="orange"
                    loading={updatePending}
                    cssOverride={{
                      display: "block"
                    }}
                    // size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader" />
                </button>

              </div>
            </div>
          </form>
        </div>
      }
    </>

  );
};

export default UpdateProduct;
