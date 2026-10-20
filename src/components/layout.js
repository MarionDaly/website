import React from "react"
import styled from "styled-components"
import GlobalStyle from "./global-styles"
import Header from "./header"
import Footer from "./footer"
import Container from "./container"

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <LayoutWrapper>
      <SkipLink href="#main">Skip to content</SkipLink>
      <Header />
      <main id="main">
        <Container>{children}</Container>
      </main>
      <Footer />
    </LayoutWrapper>
  </>
)

export default Layout

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & main {
    margin-top: auto;
    margin-bottom: auto;
  }

  & footer {
    margin-top: auto;
  }
`

const SkipLink = styled.a`
  position: absolute;
  left: var(--size-400);
  top: -100px;
  z-index: 10;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: var(--selection-text);
  background-color: var(--selection-bg);

  &:focus {
    top: var(--size-400);
  }
`
