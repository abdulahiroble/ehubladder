import { getDocs, collection, doc, getDoc, query, where } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import Participants from "../../components/Participants";
import { db } from "../../lib/firebase/initFirebase";

const Tournaments = ({ tournamentDetail, participantDetail }) => {
    const lastItem = participantDetail.length - 1;
    const secondLastItem = participantDetail.length - 2;

    return (
        <>
            <div className="bg-black text-white pt-20 h-full">
                <div className="tourney-background">
                    <div className='px-56 pt-16 w-3/5'>
                        <h2 className="text-m">EHUB CS:GO BREDDE - SOMMER 2022</h2>
                        <h1 className="text-3xl">{tournamentDetail.tournamentName}</h1>
                    </div>
                    <div className="mx-44 mt-16 bg-blue-900 bg-opacity-40">
                        <div className="text-center pt-4">
                            <div className="grid grid-cols-10 mx-2">
                                <p>Position</p>
                                <p>Team</p>
                                <p>Matches</p>
                                <p>Won</p>
                                <p>Draw</p>
                                <p>Loss</p>
                                <p className="pl-20">+</p>
                                <p className="pr-20">-</p>
                                <p>Diff</p>
                                <p>Points</p>
                                <div className="col-span-10 -mx-2 border-b py-1 border-inherit" />
                            </div>

                            <div>
                                {participantDetail.map((participant, index) => {



                                    const style = standingStyle(index, lastItem, secondLastItem);


                                    return (
                                        <Participants
                                            participant={participant}
                                            style={style}
                                        />
                                    )

                                })}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default Tournaments



export function standingStyle(index, lastItem, secondLastItem) {
    switch (index) {
        case 0:
            return `bg-lime-500 bg-opacity-40`;

        case 1:
            return `bg-yellow-300 bg-opacity-40`;

        case secondLastItem:
            return `bg-red-600 bg-opacity-40`;

        case lastItem:
            return `bg-red-600 bg-opacity-40`;

    }
}


export const getStaticPaths: GetStaticPaths = async () => {

    const querySnapshot = await getDocs(collection(db, "tournaments"));

    const paths = querySnapshot.docs.map((tournament) => {

        return {
            params: {
                id: tournament.id.toString()
            },
        };
    });

    return {
        paths,
        fallback: 'blocking',

    };
};

export const getStaticProps: GetStaticProps = async (context) => {

    const id = context.params.id;

    const tournamentDoc = doc(db, "tournaments", id as string);

    const tournamentDetail = await getDoc(tournamentDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })


    const q = query(collection(db, "participants"), where("tournamentId", "==", Number(id)));

    const participantDocs = await getDocs(q);

    const participantDetail = participantDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data

        }
    })




    return {
        props: {
            tournamentDetail,
            participantDetail,
        },
        revalidate: 10,
    }

}

