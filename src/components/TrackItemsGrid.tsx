import React from 'react';

const TrackItemsGrid: React.FC = (props) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3 xl:grid-cols-5 xl:gap-4 container mx-auto">
      {props.children}
    </div>
  );
};

export default TrackItemsGrid;
