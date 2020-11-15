import { useState, Fragment, useEffect } from "react";

// NEXT
import Head from "next/head";
import Link from "next/link";

// LAYOUT
import Layout from "../../components/Layout";

// ACTIONS
import { singleBlog, listRelatedBlogs } from "../../actions/blog";

// CONFIG
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

// MOMENT
import moment from "moment";
import renderHTML from "react-render-html";

// COMPONENTS
import SmallCard from "../../components/blog/SmallCard";

// DISQUS
import DisqusThread from "../../components/DisqusThread";

function SingleBlog({ blog }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    loadRelated();
  }, []);

  const loadRelated = () => {
    listRelatedBlogs({ blog }).then((data) => {
      if (data.error) console.log(data.error);
      else setRelated(data);
    });
  };

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

  const showRelatedBlogs = () => {
    return related.map((blog) => {
      return (
        <div className="col-md-4" key={blog._id}>
          <article>
            <SmallCard blog={blog} />
          </article>
        </div>
      );
    });
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={`${blog.title}`}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by{" "}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.username}</a>
                    </Link>{" "}
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className="pb-3">
                    {showBlogCategories()}
                    {showBlogTags()}
                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>

            <div className="container">
              <h4 className="text-center pb-5 pt-5 h2">Related blogs</h4>
              <hr />
              <div className="row">{showRelatedBlogs()}</div>
            </div>

            <div className="container pt-5 pb-5">{showComments()}</div>
          </article>
        </main>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({ query }) {
  return singleBlog(query.slug).then((data) => {
    if (data.error) console.log(data.error);
    else {
      return {
        props: {
          blog: data,
        },
      };
    }
  });
}

export default SingleBlog;
