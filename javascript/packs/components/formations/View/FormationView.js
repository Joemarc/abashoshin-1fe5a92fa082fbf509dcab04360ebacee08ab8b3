import React from 'react';
import './FormationView.scss';

const FormationView = ({formation}) => (
  <>
    <div className="course-view-left" />
    <div className="course-view-header">
      <h5>Marion Souléliac</h5>
      <h2>{formation.nomformation}</h2>
      <div className="sub-elements">
        <p>{formation.modules_count} modules</p> |
        <p>{formation.non_admin_users_count} participants</p>
      </div>
      <a className="btn-blueform" href={`https://abashosh.learnybox.com/formation/index/?idformation=${formation.idformation}`}>
        M'inscrire à la formation <i className="fas fa-chevron-right custom-fa"/>
      </a>
    </div>
  </>
);

export default FormationView;