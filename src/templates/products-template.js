import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Prose from "../components/prose"
import { glass } from "../components/glass"

// Products page. The intro and the product cards come from content/pages/products.md.
const ProductsTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  const products = frontmatter.products || []

  return (
    <Layout>
      <PageWrapper>
        <Intro dangerouslySetInnerHTML={{ __html: html }} />

        <ProductGrid>
          {products.map(product => (
            <ProductCard key={product.name}>
              <CardHeader>
                <h2>{product.name}</h2>
                {product.status && <Status>{product.status}</Status>}
              </CardHeader>

              {product.summary && <p>{product.summary}</p>}

              {product.features && product.features.length > 0 && (
                <Features>
                  {product.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </Features>
              )}

              <CardLink to="/contact/">
                Ask about {product.name}
                <span aria-hidden="true"> →</span>
              </CardLink>
            </ProductCard>
          ))}
        </ProductGrid>
      </PageWrapper>
    </Layout>
  )
}

export default ProductsTemplate

export const Head = ({ data, location }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={
      data.markdownRemark.frontmatter.description || data.markdownRemark.excerpt
    }
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query ProductsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
        products {
          name
          status
          summary
          features
        }
      }
    }
  }
`

const PageWrapper = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
`

const Intro = styled(Prose)`
  max-width: 60ch;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--size-800);
  text-align: center;

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`

const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 32ch), 1fr));
  gap: var(--size-600);
  margin: 0;
  padding: 0;
  list-style: none;
`

const ProductCard = styled.li`
  ${glass}
  display: flex;
  flex-direction: column;
  gap: var(--size-400);
  padding: 1.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: var(--glass-bg-hover);
  }
`

const CardHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--size-300);

  & h2 {
    font-size: var(--size-600);
  }
`

const Status = styled.span`
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: var(--size-300);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: var(--color-text);
  border: 1px solid var(--glass-border-strong);
  background-color: var(--glass-bg-strong);
`

const Features = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  & li {
    position: relative;
    padding-left: 1.5rem;
  }

  & li + li {
    margin-top: var(--size-200);
  }

  & li::before {
    content: "✓";
    position: absolute;
    left: 0;
    font-weight: 700;
    color: var(--color-accent-text);
  }
`

const CardLink = styled(Link)`
  margin-top: auto;
  padding-top: var(--size-400);
  color: var(--color-accent-text);
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
