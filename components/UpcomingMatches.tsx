import React from 'react'

const UpcomingMatches = ({upcomingMatch, teamDetail, participantDetail}) => {

    return (
        <>
            <div className="col-span-5 bg-gray-800 mx-20">
                <h2 className="text-3xl mx-10 mt-5 mb-3">Upcoming Matches</h2>
                <div className="col-span-8 border-b-4 border-white mb-2" />

                <div className="text-center">
                    <div className="grid grid-cols-6 mx-2">
                        <p>Date</p>
                        <p>Starttime</p>
                        <p>Type</p>
                        <p>Maps</p>
                        <p>Opponent</p>
                        <p>Match Room</p>
                        <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                    </div>

                    <div >
                        {upcomingMatch.tournament?.matches.map((match) => {
                            return (
                                <div className="grid grid-cols-6 mx-2 py-2">
                                    <p>01 May</p>
                                    <p>20:00</p>
                                    <p>BO2</p>
                                    <p>Inferno, Mirage</p>
                                    <p>{participantDetail.map((participant) => {
                                        if (participant.participantid === match.match.player2_id) {
                                            return participant.teamName
                                        } else {
                                            return null
                                        }
                                    })}</p>
                                    <p>Link</p>
                                </div>
                            )
                        })}


                        {/* {upcomingMatch.map((match, index) => {
                            return (
                                <div key={index} className="col-span-1">
                                    <div className="bg-gray-900 text-white text-center p-2">
                                        {match.match_date}
                                    </div>
                                    <div className="bg-gray-800 text-white text-center p-2">
                                        {match.match_time}
                                    </div>
                                    <div className="bg-gray-700 text-white text-center p-2">
                                        {match.match_name}
                                    </div>
                                    <div className="bg-gray-600 text-white text-center p-2">
                                        {match.team_a_name}
                                    </div>
                                    <div className="bg-gray-600 text-white text-center p-2">
                                        {match.team_b_name}
                                    </div>
                                </div>
                            )

                        }

                        )} */}

                        {/* <p>01 May</p>
                        <p>20:00</p>
                        <p>BO2</p>
                        <p>Inferno, Mirage</p>
                        <p>FaZe Clan</p>
                        <p>Link</p> */}

                        <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                    </div>

                </div>

            </div>

        </>
    )
}

export default UpcomingMatches