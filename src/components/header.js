import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import Container from "./container"
import ThemeToggle from "./theme-toggle"

// To add a page to the menu, add an entry here (keep the trailing slash).
const HEADER_NAV_ITEMS = [
  { label: `Products`, url: `/products/` },
  { label: `Blog`, url: `/blog/`, partiallyActive: true },
  { label: `About`, url: `/about/` },
  { label: `Contact`, url: `/contact/` },
]

const Header = () => {
  const { site } = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <StyledHeader>
      <HeaderWrapper>
        <HeaderTitle>
          <Link to="/">{site.siteMetadata.title}</Link>
        </HeaderTitle>

        <nav aria-label="Main">
          <NavList>
            {HEADER_NAV_ITEMS.map(item => (
              <NavListItem key={item.url}>
                <Link
                  to={item.url}
                  activeClassName="active"
                  partiallyActive={item.partiallyActive}
                >
                  {item.label}
                </Link>
              </NavListItem>
            ))}
            <NavListItem>
              <ThemeToggle />
            </NavListItem>
          </NavList>
        </nav>
      </HeaderWrapper>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  padding-top: var(--size-300);
`

const HeaderWrapper = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--size-300) var(--size-600);

  @media screen and (max-width: 700px) {
    & {
      flex-direction: column;
      gap: 0;
    }
  }
`

const HeaderTitle = styled.div`
  & a {
    display: inline-block;
    padding: 0.4rem 0;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.1rem;
    font-size: var(--size-400);
    color: inherit;
  }
`

const NavList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 2rem;
  margin: 0;
  padding: 0;
  list-style-type: none;

  @media screen and (max-width: 700px) {
    & {
      gap: 0 1rem;
    }
  }
`

const NavListItem = styled.li`
  & a {
    display: inline-block;
    padding: 0.4rem 0.1rem;
    color: inherit;
    text-transform: uppercase;
    font-size: var(--size-300);
    text-decoration: none;
    letter-spacing: 0.1rem;
  }

  & a:hover,
  & a.active {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.4em;
  }

  & a.active {
    text-decoration-color: var(--color-accent);
  }
`
