import React from 'react';

const TrackItemsGrid: React.FC = (props) => {
  return <div className="grid grid-cols-2 gap-2">{props.children}</div>;
};

export default TrackItemsGrid;
