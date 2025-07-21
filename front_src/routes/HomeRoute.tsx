import React from "react";
import "../styles/HomeRoute.css";
import loading_icon from "../assets/loading-2-svgrepo-com.svg";
// http://localhost:4000/api/get_routes

class HomeRoute extends React.Component {
  state = {
    pages: [
      {
        label: "loading...",
        icon: loading_icon,
        url: window.location.origin,
        disabled: true,
      },
    ],
  };

  componentDidMount(): void {
    this.get_routes();
  }

  get_routes() {
    const endpoint = new URL("/api/get_routes", window.location.origin);
    fetch(endpoint.href)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);

        data = data.data.map((x: any) => {
          const uint8 = new Uint8Array(x.iconsvg.data);
          const binary = Array.from(uint8)
            .map((byte) => String.fromCharCode(byte))
            .join("");
          const base64 = btoa(binary);
          const dataUri = `data:image/svg+xml;base64,${base64}`;
          x.icon = dataUri;

          delete x["iconsvg"];

          return x;
        });

        //console.log(data)
        this.setState({ ...this.state, pages: data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: `repeat(${
                this.state.pages.length >= 3 ? 3 : 1
              }, 1fr)`,
              gap: "10px",
            }}
          >
            {this.state.pages.map((x) => (
              <button
                className="btn btn-primary btn btn-light d-flex flex-column justify-content-between align-items-center p-2"
                onClick={() => (window.location.href = x.url)}
                key={`k-${x.label}`}
                disabled={x.disabled || false}
              >
                <img
                  src={x.icon}
                  alt={"svg"}
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
            textAlign: "right",
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
