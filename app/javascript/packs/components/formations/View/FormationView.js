import React from 'react';
import './FormationView.scss'

const FormationView = ({formation}) => (
  <>
    <div className="course-view-left" />
    <div className="course-view-header">
      <h6>Marion Souléliac</h6>
      <h2>{formation.nomformation}</h2>
      <p>{formation.modules_count} modules</p>
    </div>
  </>
);

export default FormationView;