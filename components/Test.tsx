import React from 'react'
import axios from 'axios'

const Test = () => {

    // click button to make post request
    const handleClick = () => {
        axios.post('https://us-central1-ehubladder.cloudfunctions.net/addParticipant', {
            name: 'David',
          })
          .then(function (response) {
            console.log(response);
          })
    }


  return (
    <div><button onClick={handleClick}>click here</button></div>
  )
}

export default Test