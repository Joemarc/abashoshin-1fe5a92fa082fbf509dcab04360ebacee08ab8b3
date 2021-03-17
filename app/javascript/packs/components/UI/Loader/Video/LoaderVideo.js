import React from "react"
import ContentLoader from "react-content-loader"

const LoaderVideo = (props) => (
  <ContentLoader
    speed={1}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="5" y="1" rx="0" ry="0" width="400" height="200" />
  </ContentLoader>
)

export default LoaderVideo

