import { Button } from '@chakra-ui/react'
import axios from "axios"
import cors from 'cors';
import express from 'express';
import { doc, setDoc } from 'firebase/firestore';
import { promises } from 'form-data';
import { db } from '../lib/firebase/initFirebase';



const EndMatch = ({ matchResult, matchDetail }) => {

    const submitScore = async () => {
        try {

            // const mapResults = matchResult.matches.map(async (match) => {
            //     const value1 = await match.team1_stats.score.toString()
            //     const value2 = await match.team2_stats.score.toString()

            //     return `${value1}-${value2}`
            //     //  return `${match.team1_stats.score.toString()}-${match.team2_stats.score.toString()},`

            // })

            // const mapOneResult = mapResults[0].then(function(value) {
            //     console.log(value)
            // })

            // const mapTwoResult = mapResults[1].then(function(value) {
            //     console.log(value)
            // })

            // const totalMapResults = await `${mapOneResult}, ${mapTwoResult}`

            // console.log(totalMapResults)

            const mapResults = `${matchResult.matches[0].team1_stats.score}-${matchResult.matches[0].team2_stats.score},${matchResult.matches[1].team1_stats.score}-${matchResult.matches[1].team2_stats.score}`

            const winnerTeamID = () => {

                if (matchResult.team1_stats.matches_won > matchResult.team2_stats.matches_won) {
                    return matchDetail.player1_id;
                } else if (matchResult.team1_stats.matches_won < matchResult.team2_stats.matches_won) {
                    return matchDetail.player2_id;
                }
            }

            await axios.put('https://us-central1-ehubladder.cloudfunctions.net/matchResult', {
                tournamentId: `${matchDetail.tournament_id}`,
                match_id: `${matchDetail.matchid}`,
                scores_csv: `${mapResults}`,
                winner_id: `${winnerTeamID()}`,

            }).then(async function (response) {
                const myMatchesRef = doc(db, "matches", matchDetail.id);

                await setDoc(myMatchesRef, {
                    map1_score: `${matchResult.matches[0].team1_stats.score}-${matchResult.matches[0].team2_stats.score}`,
                    map2_score: `${matchResult.matches[1].team1_stats.score}-${matchResult.matches[1].team2_stats.score}`,
                    team1_score: matchResult.team1_stats.matches_won,
                    team2_score: matchResult.team2_stats.matches_won,
                    finished: matchResult.finished,
                }, { merge: true });

                console.log(response);
            })

        } catch (error) {
            console.log(error)

        }
    }

    const ShowSubmitResult = () => {
        if (matchResult.finished != true) {
            return (
                <div>
                    <Button
                        onClick={submitScore}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        _hover={{ bg: 'gray.700' }}
                        _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)'
                        }}
                    >
                        End Match
                    </Button>
                </div>
            )
        } else return null;
    }

    return (
        <>
            <div className='text-5xl'>

                {matchResult.team1_stats.matches_won > matchResult.team2_stats.matches_won &&
                    <div className='flex justify-between'>
                        <h3 className='text-green-500'>{matchResult.team1_stats.matches_won}</h3>
                        <h3 className='text-red-600'>{matchResult.team2_stats.matches_won}</h3>
                    </div>
                }

                {matchResult.team1_stats.matches_won < matchResult.team2_stats.matches_won &&
                    <div className='flex justify-between'>
                        <h3 className='text-red-600'>{matchResult.team1_stats.matches_won}</h3>
                        <h3 className=' text-green-500'>{matchResult.team2_stats.matches_won}</h3>
                    </div>
                }

                {matchResult.team1_stats.matches_won == matchResult.team2_stats.matches_won &&
                    <div className='flex justify-between'>
                        <h3>{matchResult.team1_stats.matches_won}</h3>
                        <h3>{matchResult.team2_stats.matches_won}</h3>
                    </div>
                }
                
                <ShowSubmitResult />


            </div>


        </>
    )
}

export default EndMatch