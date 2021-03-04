import React from 'react';

export default function Insight(props) {
  const {insight} = props;
  return (
    <div className="container-fluid">
      <div className="row" key={insight._id}>
        <div className="col-sm-5 my-auto">
          <h2>{insight.title}</h2>
          <h3>{insight.text}</h3>
        </div>
        <div className="col-sm-7 insight">
          <img src={insight.image} alt={insight.title} className="insight-image"/>
        </div>
      </div>
    </div>
  )
}
