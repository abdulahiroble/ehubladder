import Link from "next/link"

const Participants = ({ participant, style }) => {

    return (
        <>


                <div className={`grid grid-cols-10 pt-2 ${style}`}>
                    <p>1</p>
                    <Link href={`/teams/${participant.teamId}`}>
                        <a className="hover:underline">{participant.teamName}</a>
                    </Link>
                    <p>0</p>
                    <p>0</p>
                    <p>0</p>
                    <p>0</p>
                    <p className="pl-20">0</p>
                    <p className="pr-20">0</p>
                    <p>0</p>
                    <p>0</p>
                    <div className="col-span-10 border-b py-1 border-inherit" />
                </div>




        </>
    )
}

export default Participants