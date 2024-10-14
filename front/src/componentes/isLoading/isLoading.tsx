import React from 'react';

const IsLoading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Caregando ... Se o problema persistir recarregue a página</p>
        </div>
    );
};

export default IsLoading;