import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'



export default function Home() {
  const [search, setSearch] = useState('');

  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/FoodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();

    setFoodItems(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0], response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])


  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} >
          <div className="carousel-inner" id='carousal'>

            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {/* <button className="btn btn-outline-success text-white bg-s " type="submit">Search</button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img src="/aishBug.png" className="d-block w-100" alt="Burger" style={{height:"850px", width:"50px",}}/>
            </div>
            <div className="carousel-item">
              <img src="/momoSS.png" className="d-block w-100" alt="Momo" />
            </div>
            <div className="carousel-item">
              <img src="/chickenSS.png" className="d-block w-100" alt="Chicken" />
            </div>

          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
        <div className='container'>
          {
            foodCat !== []
              ? foodCat.map((data) => {
                return (
                  <div className='row mb-3'>
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItems !== [] 
                    ?
                    foodItems.filter((item) => (item.CategoryName === data.CategoryName)   && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card
                                foodItems = {filterItems}
                                options = {filterItems.options[0]}>
                              </Card>
                            </div>
                          )
                        }
                        ) : <div>No such data Found </div>}
                  </div>
                )
              })
              : ""
          }

        </div >
        <div><Footer /></div>
      </div>

      )
}
