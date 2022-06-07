import {doc, getDoc, query, collection, where, getDocs} from "firebase/firestore";
import {GetStaticPaths, GetStaticProps} from "next";
import {db} from "../../lib/firebase/initFirebase";
import {formatMyDate} from "../../components/DateFormatter";
import {Button} from "react-bootstrap";
import StartServer from "../../components/StartServer";


const Matchroom = ({matchDetail, teamOneDetail, teamTwoDetail, serverDetail, teamOneUserDetail, teamTwoUserDetail}) => {

    const ServerInformation = () => {
        if (matchDetail.id == serverDetail[0]?.matchid) {
            return (
                <div className="py-5">
                    <p>connect {serverDetail[0].ip}:{serverDetail[0].port}</p>
                    <p>GOTV: connect {serverDetail[0].ip}:{serverDetail[0].gotv}</p>
                </div>
            )
        } else return (
            null
        )
    }

    return (
        <>
            <div className="bg-black text-white pt-20 h-full text-center">
                <div className="tourney-background">
                    <div className="grid grid-cols-3 gap-4 pt-20 mx-32">
                        <div>
                            <h3 className="text-4xl pt-10">{teamOneDetail[0].teamName}</h3>
                        </div>
                        <div>
                            <StartServer
                                teamOneDetail={teamOneDetail}
                                teamTwoDetail={teamTwoDetail}
                                matchDetail={matchDetail}
                                teamOneUserDetail={teamOneUserDetail}
                                teamTwoUserDetail={teamTwoUserDetail} />
                            <ServerInformation />
                            <h3 className="py-3 text-5xl">Versus</h3>
                            <p className="text-white pr-1">
                                {`${formatMyDate(matchDetail.started_at)}`}
                            </p>
                        </div>
                        <div>
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

    const q3 = query(collection(db, "game-servers"), where("matchid", "==", matchDetail.id));
    const serverDocs = await getDocs(q3);

    const serverDetail = serverDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })


    return {
        props: {
            matchDetail,
            teamOneDetail,
            teamTwoDetail,
            serverDetail,
            teamOneUserDetail,
            teamTwoUserDetail,

        },
        revalidate: 60,
    }

}