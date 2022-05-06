import React, {useState} from 'react'
import ReadDataFromCloudFirestore from '../../components/cloudFirestore/Read'
import {useUser} from '../../lib/firebase/useUser'
import {db} from '../../lib/firebase/initFirebase'
import {doc, setDoc} from 'firebase/firestore'
import {getAuth} from '@firebase/auth'

const Team = () => {
    const auth = getAuth()
    const {user, logout} = useUser()
    const [teamName, setTeamName] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [game, setGame] = useState<string>('')
    const [lowRank, setLowRank] = useState<string>('')
    // const [gamerTag, setGamerTag] = useState<string>('')

    // console.log(user.id)

    // console.log(auth.currentUser.uid)

    if (user) {
        const createTeam = async (user: any) => {

            try {
                const teamDoc = doc(db, "teams", auth.currentUser.uid)
                await setDoc(teamDoc, {
                    teamName: teamName,
                    country: country,
                    game: game,
                    lowRank: lowRank,
                    owner: auth.currentUser.uid
                })
            } catch (error) {
                console.log(error)
                alert(error)
            }

        }



        return (
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                <div className="w-full">

                    <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                        Create Team
                    </h1>
                    <div>
                        <label className="block text-sm">
                            Team Name
                        </label>
                        <input type="text"
                            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Team Name"
                            onChange={(e) => setTeamName(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm">
                            Country
                        </label>
                        <input type="text"
                            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Country"
                            onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mt-4 text-sm">
                            Game
                        </label>
                        <input
                            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Game"
                            type="text"
                            onChange={(e) => setGame(e.target.value)} />
                    </div>
                    <div>
                        <label className="block mt-4 text-sm">
                            Lowrank
                        </label>
                        <input
                            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Lowrank"
                            type="text"
                            onChange={(e) => setLowRank(e.target.value)} />
                    </div>
                    {/* <div>
                        <label className="block mt-4 text-sm">
                            Logo
                        </label>
                        <input
                            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Logo"
                            type="text"
                            onChange={(e) => setGamerTag(e.target.value)} />
                    </div> */}
                    {/* <div>
                        <label className="block mt-4 text-sm">
                            GamerTag
                        </label>
                        <input
                            className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="STEAM_1:1:21977583"
                            type="text"
                            onChange={(e) => setSteamId(e.target.value)} />
                    </div> */}





                    <button
                        className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                        onClick={createTeam} >
                        Create Team
                    </button>

                </div>
            </div>
        )
    } else return (
        <div>hello</div>
    )

}

export default Team