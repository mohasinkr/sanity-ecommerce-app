import { notFound } from "next/navigation";
import { Suspense } from "react";

import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { productPagesSlugs, productQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: productPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
// export async function generateMetadata(
//   props: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const params = await props.params;
//   const { data: post } = await sanityFetch({
//     query: postQuery,
//     params,
//     // Metadata should never contain stega
//     stega: false,
//   });
//   const previousImages = (await parent).openGraph?.images || [];
//   const ogImage = resolveOpenGraphImage(post?.coverImage);

//   return {
//     authors:
//       post?.author?.firstName && post?.author?.lastName
//         ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
//         : [],
//     title: post?.title,
//     description: post?.excerpt,
//     openGraph: {
//       images: ogImage ? [ogImage, ...previousImages] : previousImages,
//     },
//   } satisfies Metadata;
// }

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: product }] = await Promise.all([
    sanityFetch({ query: productQuery, params }),
  ]);

  if (!product?._id) {
    return notFound();
  }

  return (
    <>
      <div className="">
        <div className="container my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
              <div className="max-w-3xl flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                  {product.name}
                </h2>
              </div>
              {/* <div className="max-w-3xl flex gap-4 items-center">
                {product.author &&
                  product.author.firstName &&
                  product.author.lastName && (
                    <Avatar person={product.author} date={product.date} />
                  )}
              </div> */}
            </div>
            <article className="gap-6 grid max-w-4xl">
              <div className="">
                <CoverImage image={product.image} priority />
              </div>
              {/* {product.content?.length && (
                <PortableText
                  className="max-w-2xl"
                  value={product.content as PortableTextBlock[]}
                />
              )} */}
              <h1>{product.price}</h1>
            </article>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="container my-12 lg:my-24 grid gap-12">
          <aside>
            <Suspense>{await MorePosts({ skip: product._id, limit: 2 })}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
