import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderArticleView = props => (
  <ContentLoader
    width={1400}
    height={1000}
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="0" rx="4" ry="4" width="1400" height="400" />
    <rect x="200" y="457" rx="4" ry="4" width="150" height="10" />
    <rect x="200" y="515" rx="4" ry="4" width="720" height="15" />
    <rect x="200" y="547" rx="4" ry="4" width="598" height="15" />
    <rect x="200" y="581" rx="4" ry="4" width="720" height="15" />
    <rect x="200" y="612" rx="4" ry="4" width="520" height="15" />
    <rect x="200" y="652" rx="4" ry="4" width="720" height="15" />
    <rect x="200" y="684" rx="4" ry="4" width="598" height="15" />
    <rect x="200" y="718" rx="4" ry="4" width="720" height="15" />
    <rect x="200" y="748" rx="4" ry="4" width="419" height="15" />
    <rect x="200" y="800" rx="4" ry="4" width="419" height="15" />
    <rect x="200" y="840" rx="4" ry="4" width="419" height="15" />
    <rect x="200" y="880" rx="4" ry="4" width="419" height="15" />
    <rect x="200" y="920" rx="4" ry="4" width="419" height="15" />
    <rect x="200" y="960" rx="4" ry="4" width="419" height="15" />
  </ContentLoader>
)

export default LoaderArticleView;