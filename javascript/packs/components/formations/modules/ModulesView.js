import React, {Component} from 'react';
import './ModulesView.scss';

class ModulesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    };
  }

  onButtonClickHandler = () => {
    this.setState({showDescription: !this.state.showDescription});
  };

  render() {
    const {module} = this.props;
    return (
      <>
        <div className="module-container">
          <div className="module-container-top-infos">
            <h3>{module.nommodule}</h3>
            <span>Difficulté: {module.difficulte}/5</span>
            <span><i className="fas fa-clock" /> {module.duree} minutes</span>
          </div>

          {this.state.showDescription && <p className="module-description">{module.description}</p>}
          <div className="view-more">
            {
              this.state.showDescription ?
                  <i className="fas fa-sort-up custom-arrow-fa" onClick={this.onButtonClickHandler} />
                :
                  <i className="fas fa-sort-down custom-arrow-fa" onClick={this.onButtonClickHandler} />
            }
          </div>
        </div>
        <div className="module-zoom">
          <button className="zoom-btn">
            <i className="fas fa-video" />
            Réunion intérmédiaire
            <span className="special-zoom"> Zoom</span>
          </button>
        </div>
      </>
    )
  };
}

export default ModulesView;