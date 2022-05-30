import Link from 'next/link';
import React from 'react'
import {formatMyDate} from './DateFormatter'

const UpcomingMatches = ({teamDetail, teamOneDetail, teamTwoDetail, matchDetail}) => {

    let d = formatMyDate(matchDetail?.map((match) => match.started_at))
    let date = d.split(' ').splice(0, 2).join(' ').replace(/,/g, '');
    let time = d.split(' ').splice(3, 5).join(' ')

    return (
        <>
            <div className="col-span-5 bg-gray-800 mx-20">
                <h2 className="text-3xl mx-10 mt-5 mb-3">Upcoming Matches</h2>
                <div className="col-span-8 border-b-4 border-white mb-2" />

                <div className="text-center">
                    <div className="grid grid-cols-5 mx-2">
                        <p>Date</p>
                        <p>Starttime</p>
                        <p>Maps</p>
                        <p>Opponent</p>
                        <p>Match Room</p>
                        <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 mx-2 py-2">
                            {/* {
                                matchDetail.map((match, index) => {
                                    return (
                                        <div key={index}>
                                            <p>{date}</p>
                                            <p>{time}</p>
                                            <p>{match.map}</p>
                                            <p>{match.opponent}</p>
                                            <p>{match.match_room}</p>
                                        </div>
                                    )
                                }
                                )
                            } */}

                            <p>{date}</p>
                            <p>{time}</p>
                            <p>Inferno, Mirage</p>
                            <p>{teamTwoDetail[0]?.teamName != teamDetail?.teamName ? teamTwoDetail[0]?.teamName : teamOneDetail[0]?.teamName}</p>
                            <p>{matchDetail?.map((match) => <Link href={`/match/${match.id}`}>Link</Link>)}</p>
                        </div>

                        <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                    </div>

                </div>

            </div>

        </>
    )
}

export default UpcomingMatches