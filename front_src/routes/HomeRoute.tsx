import React from "react";
import "../styles/HomeRoute.css";
import phpmyadmin_icon from "../assets/phpmyadmin-svgrepo-com.svg";
import convertx_icon from "../assets/convert-3d-cube-svgrepo-com.svg";

class HomeRoute extends React.Component {
  pages = [
    {
      label: "phpmyadmin",
      icon: phpmyadmin_icon,
      url: "https://phpmyadmin.bigraiden.com/",
    },
    {
      label: "convertx",
      icon: convertx_icon,
      url: "https://convertx.bigraiden.com/",
    },
  ];

  render() {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: `repeat(${
                this.pages.length >= 3 ? 3 : 1
              }, 1fr)`,
              gap: "10px",
            }}
          >
            {this.pages.map((x) => (
              <button
                className="btn btn-primary btn btn-light d-flex flex-column justify-content-between align-items-center p-2"
                onClick={() => (window.location.href = x.url)}
              >
                <img
                  src={x.icon}
                  alt={x.label}
                  style={{ maxWidth: "40px", maxHeight: "40px" }}
                />
                <small className="text-muted">{x.label}</small>
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            fontSize: "16px",
            color: "#6c757d",
          }}
        >
          bigraiden.com
        </div>

        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            fontSize: "16px",
            textAlign: 'right',
            color: "#6c757d",
          }}
        >
          matías boyer
        </div>
      </>
    );
  }
}

export default HomeRoute;
