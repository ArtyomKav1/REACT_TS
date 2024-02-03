import preloader from '../../images/loading-78.gif'
import React from 'react';

let Preloader = (props) => {
    return <div>
        <img style={{ height: '100px' }} src={preloader} />
    </div>
}


export default Preloader;