import { useState, Fragment } from "react";

// NEXT
import Head from "next/head";
import Link from "next/link";
import Router, { withRouter } from "next/router";

// LAYOUT
import Layout from "../../components/Layout";

// ACTIONS
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

// COMPONENTS
import Card from "../../components/blog/Card";

// CONFIG
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

function Blogs({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkip,
  router,
}) {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(blogsSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    const toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) console.log(data.error);
      else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const head = () => (
    <Head>
      <title>Programming Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web development"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest development tutorials on | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web development"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/travis-scott-astroworld.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/travis-scott-astroworld.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showAllBlogs = () => {
    return blogs.map((blog) => {
      return (
        <article key={blog._id}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((category) => (
      <Link key={category._id} href={`/categories/${category.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3"> {`${category.name}`}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((tag) => (
      <Link key={tag._id} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {`${tag.name}`}
        </a>
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog) => (
      <article key={blog._id}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming Blogs and Tutorials
                </h1>
              </div>
              <section>
                <div className="pt-5 text-center">
                  {showAllCategories()}
                  <br />
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const skip = 0;
  const limit = 2;

  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) console.log(data.error);
    else
      return {
        props: {
          blogs: data.blogs,
          categories: data.categories,
          tags: data.tags,
          totalBlogs: data.size,
          blogsLimit: limit,
          blogsSkip: skip,
        },
      };
  });
}

export default withRouter(Blogs);
