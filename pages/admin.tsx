import { GetServerSideProps, GetStaticProps } from 'next'
import ResetTournament from '../components/ResetTournament';
import StartTournament from '../components/StartTournament';


const Admin = ({ tournaments }) => {


    return (
        <>
            <div className="bg-black pt-48 flex space-x-5">


                <ResetTournament
                    tournaments={tournaments} />
                <StartTournament
                    tournaments={tournaments} />


            </div>
        </>
    )
}

export default Admin;

export const getStaticProps: GetStaticProps = async () => {


    const tourneyRes = await fetch(`https://us-central1-ehubladder.cloudfunctions.net/getAllTournaments`);
    const tournaments = await tourneyRes.json();


    return {
        props: {
            tournaments,

        },
        revalidate: 60,
    }

}