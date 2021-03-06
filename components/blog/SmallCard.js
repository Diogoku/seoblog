// NEXT
import Link from "next/link";

// MOMENT
import moment from "moment";

// RENDER HTML
import renderHTML from "react-render-html";

// API
import { API } from "../../config";

function SmallCard({ blog }) {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ height: "250px", width: "100%" }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={`${blog.title}`}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>
          <p className="card-text">{renderHTML(blog.excerpt)}</p>
        </section>
      </div>

      <div className="card-body">
        <section>
          <div className="pb-3">{renderHTML(blog.excerpt)}</div>
          <div>
            Posted {moment(blog.updatedAt).fromNow()} by{" "}
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>{blog.postedBy.username}</a>
            </Link>{" "}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SmallCard;
