import React from "react";

const Newsitem = (props) => {
  let { title, description, imageurl, newsurl, author, time, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={
            imageurl
              ? imageurl
              : "https://www.techexplorist.com/wp-content/uploads/2023/07/fabric-of-space-time.jpg"
          }
          className="card-img-top image-size"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger "
            style={{ left: "90%", zindex: "1" }}
          >
            {source ? source : "unknown"}
            <span class="visually-hidden">unread messages</span>
          </span>
          <p className="card-text">{description}</p>
          <div class="card-footer text-muted">
            By {author} on {time}
          </div>
          <a
            href={newsurl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-dark btn-sm"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};
export default Newsitem;
