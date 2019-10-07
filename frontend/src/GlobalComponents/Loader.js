import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

export default (props) => (
     <Dimmer active>
        <Loader size='massive'>Loading</Loader>
    </Dimmer>
)