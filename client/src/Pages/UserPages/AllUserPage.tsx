import { useContext, useEffect, useState } from "react";
import { Pagination } from "../../Components/Pagination/Pagination"
import { IUser } from "../../Interfaces/User";
import { AppContext } from "../../Context/AppContext";
import { IProfile } from "../../Interfaces/Chat/IProfile";
import { ProfileComp } from "../../Components/Users/ProfileComp";

export const AllUsersPage = () =>{

    const {getUsers, getAllProfiles, currentProfileUser} = useContext(AppContext);

    //const [users, setUsers] = useState([] as IUser[]);
    const [profiles, setProfiles] = useState([] as IProfile[]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    useEffect(()=>{
        getAllProfiles().then(resp => setProfiles(resp));
    }, [])


    const handlePrevPage = (prevPage: number) => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = (nextPage: number) => {
        setPage((nextPage) => nextPage + 1);
    };

    console.log(currentProfileUser);

    return(
        <div>
        <div className="all-users-title">
            <h2>Search for a user</h2>
        </div>

        <div className="search-container">
            <form>
                <input type="text"></input>
            </form>
        </div>

        <table className="table table-dark">
            <caption>List of users</caption>
            <thead className="bg-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                </tr>
                
            </thead>

            <tbody>
                {profiles.map(u => <ProfileComp data={u} userProfileId={currentProfileUser.id}/>)}
                {/*<ProfileComp user_id={2}/>*/}
            </tbody>
        </table>
      
    
        
            <Pagination 
                totalPages={totalPages}
                currentPage={page}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
            />

            
        </div>
    )
}