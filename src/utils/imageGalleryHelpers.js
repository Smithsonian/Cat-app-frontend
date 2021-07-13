export const renderLeftNav = (onClick, disabled) => {
  return (
    <div className='carousel-control-prev' style={{ cursor: 'pointer' }}>
      <div className='carousel-control-prev-icon' disabled={disabled} onClick={onClick} />
    </div>
  );
};

export const renderRightNav = (onClick, disabled) => {
  return (
    <div className='carousel-control-next' style={{ cursor: 'pointer' }}>
      <div className='carousel-control-next-icon' disabled={disabled} onClick={onClick} />
    </div>
  );
};
