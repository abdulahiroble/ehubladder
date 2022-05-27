import React from 'react'

const UpcomingMatches = ({upcomingMatch, teamDetail, participantDetail, teamOneDetail, teamTwoDetail}) => {

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
                    <div>
                        <div className="grid grid-cols-6 mx-2 py-2">
                            <p>01 May</p>
                            <p>20:00</p>
                            <p>BO2</p>
                            <p>Inferno, Mirage</p>
                            <p>{teamTwoDetail[0].teamName}</p>
                            <p>Link</p>
                        </div>

                        <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                    </div>

                </div>

            </div>

        </>
    )
}

export default UpcomingMatches