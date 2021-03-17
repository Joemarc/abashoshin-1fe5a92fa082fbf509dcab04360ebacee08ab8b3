import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import './VideoCard.scss'

const VideoCard = ({ video }) => {
  return (
    <Link to={`/videos/${video.slug}`} className="video-card">
      <div className="video-card--preview" style={{ backgroundImage: `url(${video.preview ? video.preview.large.url : 'null'})` }}>
        <div className="video-card-time">
          <span className="video-card--preview-content"> {
            <FontAwesomeIcon icon={faPlay}/>
          } 14:56</span>
        </div>
      </div>
      <h6 className="video-card--title">{video.title}</h6>
    </Link>
  );
}

export default VideoCard;