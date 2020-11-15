// NEXT
import Link from "next/link";

// MOMENT
import moment from "moment";

// RENDER HTML
import renderHTML from "react-render-html";

// API
import { API } from "../../config";

function Card({ blog }) {
  const showBlogCategories = () =>
    blog.categories.map((category) => (
      <Link key={category._id} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));

  const showBlogTags = () =>
    blog.tags.map((tag) => (
      <Link key={tag._id} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by{" "}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.username}</a>
          </Link>{" "}
          | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories()}
        {showBlogTags()}
        <br />
        <br />
      </section>
      <div className="row">
        <div className="col-md-4">
          <section>
            <img
              className="img img-fluid"
              style={{ maxHeight: "auto", width: "100%" }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={`${blog.title}`}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Card;
