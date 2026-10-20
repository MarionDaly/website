import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import StyledLink from "../components/styled-link"
import { glass } from "../components/glass"

const NotFoundPage = () => (
  <Layout>
    <Wrapper>
      <Card>
        <Code>404</Code>
        <h1>Well, this is awkward.</h1>
        <p>We made a mistake — this page doesn’t exist.</p>
        <StyledLink to="/">Back to the home page</StyledLink>
      </Card>
    </Wrapper>
  </Layout>
)

export default NotFoundPage

export const Head = () => <Seo title="Page not found" noindex />

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
`

const Card = styled.div`
  ${glass}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--size-400);
  max-width: 45ch;
  padding: var(--size-700);
  border-radius: 8px;
  text-align: center;

  & h1 {
    font-size: var(--size-600);
  }

  & p {
    margin-bottom: var(--size-400);
  }
`

const Code = styled.span`
  font-size: var(--size-900);
  font-weight: 700;
  line-height: 1;
  color: var(--color-accent-text);
`
