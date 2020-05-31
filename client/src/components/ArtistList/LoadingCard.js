import React from 'react';
import ContentLoader from "react-content-loader";

const LoadingCard = () => (
  <div className="ArtistList-item-container">
    <ContentLoader
      speed={2}
      width={380}
      height={110}
      viewBox="0 0 380 110"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="16" y="16" rx="3" ry="3" width="130" height="16" />
      <rect x="260" y="10" rx="0" ry="0" width="90" height="90" />
    </ContentLoader>
  </div>
);

export default LoadingCard;
