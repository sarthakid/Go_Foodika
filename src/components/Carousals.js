import React from 'react';

export default function Carousals() {
  return (
    <div>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}} >
          <div className="carousel-inner" id='carousal'>
            
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success text-white bg-s " type="submit">Search</button>
              </form>
            </div>

            <div className="carousel-item active">
              <img src="/burgerSS.png" className="d-block w-100" alt="Burger" />
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
    </div>
  );
}
