import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"
import { Heading, Text } from "@medusajs/ui"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative " data-testid="product-container">
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6 2xsmall:max-small:order-3">
          <div className="product-description flex justify-center ">
            <div className="max-w-md"> {/* Adjust the max width as needed */}
              <h2 className="text-lg font-semibold text-center pb-5">الوصف</h2>
              {product.description && (
                <ul className="list-none ">
                  {product.description.split('\n').map((line, index) => (
                    line.trim() !== "" && (
                      <li key={index} className="text-md pt-5 ps-3">{line}</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-7   relative small:sticky small:top-48 small:py-0 s w-full py-8 2xsmall:max-small:order-1">
          <ProductInfo product={product} />
          <ImageGallery images={product?.images || []} />

        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12 2xsmall:max-small:order-2 large:pt-10">
          <Suspense
            fallback={<ProductActions product={product} region={region} />}
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      <div className="content-container my-16 small:my-32" data-testid="related-products-container">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
