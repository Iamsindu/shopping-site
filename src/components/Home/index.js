import React, { useState, useEffect } from "react";
import Item from "../Item";
import ContentLoader from "react-content-loader";

export default function Home({ categories, addProduct }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("electronics");

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${category}?limit=3`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="container">
      <div className="pb-5">
        <img
          src="images/ecommerce-banner-multivendor-ecommerce.jpg"
          className="img-fluid"
          alt="banner"
        />
      </div>
      <ul className="nav mb-3">
        {categories.map((datum, index) => {
          return (
            <li key={`category${index}`} className="nav-item me-2">
              <button
                type="button"
                className={`btn btn-sm ${
                  category === datum ? "btn-primary" : "btn-light"
                }`}
                onClick={() => {
                  setCategory(datum);
                }}
              >
                {datum}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="row">
        {!loading ? (
          <React.Fragment>
            {data.map((datum, index) => {
              return (
                <Item
                  key={`totalitem${index}`}
                  data={datum}
                  addProduct={addProduct}
                />
              );
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {Array(3)
              .fill(null)
              .map((_, idx) => {
                return (
                  <div className="col-md-4 mb-4" key={`loader${idx}`}>
                    <div className="card">
                      <div className="card-body">
                        <ContentLoader
                          style={{ width: "100%" }}
                          speed={2}
                          width={400}
                          height={460}
                          viewBox="0 0 400 460"
                          backgroundColor="#f3f3f3"
                          foregroundColor="#ecebeb"
                        >
                          <rect
                            x="0"
                            y="0"
                            rx="2"
                            ry="2"
                            width="400"
                            height="250"
                          />
                          <rect
                            x="0"
                            y="260"
                            rx="2"
                            ry="2"
                            width="400"
                            height="10"
                          />
                          <rect
                            x="0"
                            y="280"
                            rx="2"
                            ry="2"
                            width="240"
                            height="10"
                          />
                          <rect
                            x="0"
                            y="300"
                            rx="2"
                            ry="2"
                            width="400"
                            height="10"
                          />
                          <rect
                            x="0"
                            y="340"
                            rx="2"
                            ry="2"
                            width="150"
                            height="10"
                          />
                          <rect
                            x="300"
                            y="330"
                            rx="2"
                            ry="2"
                            width="100"
                            height="20"
                          />
                        </ContentLoader>
                      </div>
                    </div>
                  </div>
                );
              })}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
