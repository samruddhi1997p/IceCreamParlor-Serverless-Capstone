import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

function Callback() {
  return (
    <Dimmer active>
      <Loader content="Freezing" />
    </Dimmer>
  )
}

export default Callback
