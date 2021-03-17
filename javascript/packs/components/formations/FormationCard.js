import React from 'react';
import './FormationCard.scss'
import {Link} from "react-router-dom";

const FormationCard = ({formation}) => (
    <div className="course-preview">
      <h6>Marion Souléliac</h6>
      <h2>{formation.nomformation}</h2>
      <div className="sub-elements">
        <p>{formation.modules_count} modules</p> |
        <p>{formation.non_admin_users_count} participants</p>
      </div>
      <Link className="view-more-btn" to={`/formations/${formation.idformation}`}>Voir le détail <i className="fas fa-chevron-right" /> </Link>
    </div>
);

export default FormationCard;