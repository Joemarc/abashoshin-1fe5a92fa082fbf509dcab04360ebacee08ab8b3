import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  validateToken, getVideos
} from '../../../src/scripts/actions';
import VideoCard from "../../../components/videos/VideoCard";
import './Videos.scss'
import {withRouter} from "react-router-dom";

class Videos extends Component {
  componentDidMount() {
    const {validateToken: validateTokenAction} = this.props;

    validateTokenAction().then(this.getVideosList()).catch(this.getVideosList);
  }

  getVideosList = () => {
    const { getVideos: getVideosAction } = this.props;

    return Promise.all([getVideosAction()]).then(response => {
      return response;
    })
  };

  render() {
    const { videos, isLoading } = this.props;

    const renderVideos = () => {
      let component;
      if (isLoading) {
        component = [1, 2, 3, 4].map(i => `${i}`);
      } else if (videos.length) component = videos.map(v => <VideoCard video={v} key={v.id}/>);
      else component = 'Aucun videos à afficher pour le moment';
      return component;
    };

    return (
      <div className="page-video-container">
        <div className="videos-content">
          <h1 className="title-page">Vidéos Ressources</h1>
          <p>List de vidéos ressources visant à ...</p>
        </div>
        <div className="videos-container">
          <h2>Les dernières vidéos</h2>
          <div className="videos-cards">
            {renderVideos()}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getVideos, validateToken
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.authReducer.user,
    videos: state.videosReducer.videosList,
    isLoading: state.videosReducer.isLoading
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Videos));