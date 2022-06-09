import {doc, getDoc, query, collection, where, getDocs} from "firebase/firestore";
import {GetStaticPaths, GetStaticProps} from "next";
import {db} from "../../lib/firebase/initFirebase";
import {formatMyDate} from "../../components/DateFormatter";
import {Button} from '@chakra-ui/react'
import StartServer from "../../components/StartServer";
import EndMatch from "../../components/EndMatch";
import axios from "axios";




const Matchroom = ({matchDetail, teamOneDetail, teamTwoDetail, serverDetail, teamOneUserDetail, teamTwoUserDetail, matchResult}) => {
    const username = process.env.NEXT_PUBLIC_DATHOST_USERNAME;
    const password = process.env.NEXT_PUBLIC_DATHOST_PASSWORD;

    console.log(matchDetail.finished)

    const downloadDemoMap1 = async () => {
        await axios({
            url: `https://dathost.net/api/0.1/game-servers/${serverDetail[0].serverId}/files/${matchResult.matches[0].id}.dem`, //your url
            method: 'GET',
            responseType: 'blob', // important
            headers: {
                authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
                    'base64'
                )}`,
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "1800",
                "Access-Control-Allow-Headers": "content-type",
                "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
            },

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${matchResult.matches[0].id}.dem`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }

    const downloadDemoMap2 = async () => {

        await axios({
            url: `https://dathost.net/api/0.1/game-servers/${serverDetail[0].serverId}/files/${matchResult.matches[1].id}.dem`, //your url
            method: 'GET',
            responseType: 'blob', // important
            headers: {
                authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
                    'base64'
                )}`,
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Max-Age": "1800",
                "Access-Control-Allow-Headers": "content-type",
                "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
            },

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${matchResult.matches[1].id}.dem`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }


    const ServerInformation = () => {

        if (matchResult?.finished) {
            return (
                null
            )

        } else if (matchDetail?.id == serverDetail[0]?.matchid)
            return (

                <div className="py-5">
                    <p>connect {serverDetail[0]?.ip}:{serverDetail[0]?.port}</p>
                    <p>GOTV: connect {serverDetail[0]?.ip}:{serverDetail[0]?.gotv}</p>
                </div>
            )

        return null
    }

    const ShowDownloadDemo = () => {
        if (matchDetail.finished == false) {
            return (
                <div className="flex justify-center space-x-6 py-6">
                    <Button
                        onClick={downloadDemoMap1}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        _hover={{bg: 'gray.700'}}
                        _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)'
                        }} >
                        Download Map Demo 1
                    </Button>
                    <Button onClick={downloadDemoMap2}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        _hover={{bg: 'gray.700'}}
                        _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)'
                        }} >
                        Download Map Demo 2
                    </Button>
                </div>
            )
        } else return null
    }

    const ShowStartServerButton = () => {
        if (serverDetail[0]?.ip) {
            return null

        } else {
            return (
                <div>
                    <StartServer
                        teamOneDetail={teamOneDetail}
                        teamTwoDetail={teamTwoDetail}
                        matchDetail={matchDetail}
                        teamOneUserDetail={teamOneUserDetail}
                        teamTwoUserDetail={teamTwoUserDetail} />
                </div>
            )
        }

    }

    // const ShowMatchResult = () => {
    //     if (matchDetail.finished == true) {
    //         return (
    //             <div>
    //                 <EndMatch
    //                     matchResult={matchResult}
    //                     matchDetail={matchDetail}
    //                 />
    //             </div>
    //         )
    //     } else return (
    //         null
    //     )
    // }

    return (
        <>
            <div className="bg-black text-white pt-20 h-full text-center">
                <div className="tourney-background">
                    <div className="grid grid-cols-3 gap-4 pt-20 mx-32">
                        <div>
                            <img src={teamOneDetail[0].teamLogo} alt="" className="rounded-full h-52 w-full mx-auto" />
                            <h3 className="text-4xl pt-10">{teamOneDetail[0].teamName}</h3>
                        </div>
                        <div>

                            <ShowStartServerButton />
                            <ServerInformation />
                            <EndMatch matchResult={matchResult} matchDetail={matchDetail} />
                            {/* <ShowMatchResult /> */}
                            <h3 className="py-3 text-5xl">Versus</h3>
                            <p className="text-white pr-1">
                                {`${formatMyDate(matchDetail.started_at)}`}
                            </p>
                            <ShowDownloadDemo />
                        </div>
                        <div>
                            <img src={teamTwoDetail[0].teamLogo} alt="" className="rounded-full h-52 w-full mx-auto" />
                            <h3 className="text-4xl pt-10">{teamTwoDetail[0].teamName}</h3>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Matchroom;

export const getStaticPaths: GetStaticPaths = async () => {

    const querySnapshot = await getDocs(collection(db, "matches"));

    const paths = querySnapshot.docs.map((match) => {

        return {
            params: {
                id: match.id.toString()
            },
        };
    });

    return {
        paths,
        fallback: false,

    };
};

export const getStaticProps: GetStaticProps = async (context) => {

    const matchDoc = doc(db, "matches", context.params.id as string);
    const matchDetail = await getDoc(matchDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })

    const q1 = query(collection(db, "participants"), where("participantid", "==", Number(matchDetail.player1_id)));
    const q2 = query(collection(db, "participants"), where("participantid", "==", Number(matchDetail.player2_id)));

    const teamOneDocs = await getDocs(q1);
    const teamTwoDocs = await getDocs(q2);

    const teamOneDetail = teamOneDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })

    const teamTwoDetail = teamTwoDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })

    const q4 = query(collection(db, "users"), where("team", "==", teamOneDetail[0].teamId));
    const q5 = query(collection(db, "users"), where("team", "==", teamTwoDetail[0].teamId));
    const teamOneUserDocs = await getDocs(q4);
    const teamTwoUserDocs = await getDocs(q5);

    const teamOneUserDetail = teamOneUserDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })

    const teamTwoUserDetail = teamTwoUserDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })

    const q3 = query(collection(db, "gameservers"), where("matchid", "==", matchDetail.id));
    const serverDocs = await getDocs(q3);

    const serverDetail = serverDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })

    const username = process.env.NEXT_PUBLIC_DATHOST_USERNAME;
    const password = process.env.NEXT_PUBLIC_DATHOST_PASSWORD;

    const matchHest = async () => {
        if (matchDetail.match_series_id != "") {
            const matchRes = await axios.get(`https://dathost.net/api/0.1/match-series/${matchDetail.match_series_id}`, {
                headers: {
                    authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
                        'base64'
                    )}`,
                },
            })

            return matchRes.data
        } else return null


    }




    return {
        props: {
            matchDetail,
            teamOneDetail,
            teamTwoDetail,
            serverDetail,
            teamOneUserDetail,
            teamTwoUserDetail,
            matchResult: await matchHest()
        },
        revalidate: 60,
    }

}