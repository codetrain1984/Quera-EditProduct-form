// TODO: copy codes from the ProductForm component here...
import React, { useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ProductForm = ({ onSubmit, mode }) => {
  const { productId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (mode === "edit") {
      axios.get(`http://localhost:8000/products/${productId}`).then((res) => {
        setValue("name", res.data.name);
        setValue("price", res.data.price);
        setValue("category", res.data.category);
        setValue("description", res.data.description);
      });
    }
  }, []);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="name-input" className="form-label">
            نام محصول
          </label>
          <input
            type="text"
            {...register("name", {
              required: "وارد کردن نام محصول اجباری است",
            })}
            className={`form-control${errors.name ? " is-invalid" : ""}`}
            data-testid="name-input"
            placeholder="گوشی آیفون"
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="price-input" className="form-label">
            قیمت
          </label>
          <input
            type="number"
            {...register("price", {
              required: "وارد کردن قیمت اجباری است",
              min: {
                value: 100,
                message: "مقدار قیمت باید حداقل 100 باشد",
              },
            })}
            className={`form-control${errors.price ? " is-invalid" : ""}`}
            data-testid="price-input"
            placeholder="1000"
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price.message}</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="form-group col-md-6">
          <label htmlFor="category-select" className="form-label">
            دسته‌بندی
          </label>
          <select
            className="form-select"
            data-testid="category-select"
            {...register("category")}
          >
            <option value="mobile">موبایل</option>
            <option value="book">کتاب</option>
            <option value="tshirt">تیشرت</option>
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="description-textarea" className="form-label">
            توضیحات
          </label>
          <textarea
            className={`form-control${errors.description ? " is-invalid" : ""}`}
            {...register("description")}
            data-testid="description-textarea"
            rows="3"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4 float-start"
        data-testid="submit-button"
      >
        افزودن محصول
      </button>
    </form>
  );
};

export default ProductForm;
