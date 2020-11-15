import { Fragment } from "react";

// LAYOUT
import Layout from "../../components/Layout";

// NEXT
import Head from "next/head";

// ACTIONS
import { getSingleTag } from "../../actions/tag";

// COMPONENTS
import Card from "../../components/blog/Card";

// CONFIG
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

function Tag({ tag, blogs }) {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best platform to find the best programming tutorials on ${tag.name} `}
      />
      <link rel="canonical" href={`${DOMAIN}/tags/${tag.slug}`} />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best platform to find the best programming tutorials on ${tag.name} `}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${tag.slug}`} />
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

  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                {blogs.map((blog) => (
                  <Card key={blog._id} blog={blog} />
                ))}
                <hr />
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({ query }) {
  return getSingleTag(query.slug).then((data) => {
    if (data.error) console.log(data.error);
    else return { props: { tag: data.tag, blogs: data.blogs } };
  });
}

export default Tag;
