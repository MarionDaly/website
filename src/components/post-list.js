import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Tags from "./tags"
import { glass } from "./glass"

const PostList = ({ posts }) => (
  <StyledPostList>
    {posts.map(post => (
      <PostListItem key={post.fields.slug} post={post} />
    ))}
  </StyledPostList>
)

export default PostList

const PostListItem = ({ post }) => {
  const { title, tags, date, dateIso, description } = post.frontmatter

  return (
    <StyledPostListItem>
      <Tags tags={tags} />

      <PostListTitle>
        <Link to={post.fields.slug}>{title}</Link>
      </PostListTitle>

      <PostListExcerpt>{description || post.excerpt}</PostListExcerpt>

      <PostListMeta>
        <time dateTime={dateIso}>{date}</time>
        <span>{post.timeToRead} min read</span>
      </PostListMeta>
    </StyledPostListItem>
  )
}

// Fields every post list needs. Use it in a page query as `...PostListItem`.
export const query = graphql`
  fragment PostListItem on MarkdownRemark {
    excerpt
    timeToRead
    fields {
      slug
    }
    frontmatter {
      title
      description
      tags
      date(formatString: "MMMM D, YYYY")
      dateIso: date
    }
  }
`

const StyledPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: grid;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`

const StyledPostListItem = styled.li`
  ${glass}
  display: flex;
  width: 100%;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: var(--glass-bg-hover);
  }

  /* The title link covers the whole card, so show focus on the card */
  &:focus-within {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
  }

  @media screen and (max-width: 500px) {
    & + & {
      margin-top: var(--size-600);
    }
  }
`

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: var(--size-600);
  font-weight: 700;

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a:focus-visible {
    outline: none;
  }

  & a::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

const PostListExcerpt = styled.p`
  margin-top: auto;
  font-size: var(--size-400);
`

const PostListMeta = styled.div`
  margin-top: 2rem;
  font-size: var(--size-300);
  display: flex;
  justify-content: space-between;
  gap: var(--size-400);
  color: var(--color-text-muted);
`
