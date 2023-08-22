import { useContext, useState } from "react"
import { AppContext } from "../Context/AppContext"
import { ISTD } from "../Interfaces/SiteTypeDescription";
import { Link } from "react-router-dom";

export const Home = () =>{
    const {getSiteTypeList} = useContext(AppContext);
    const [STDlist, setSTDList] = useState([] as ISTD[]);

    useState(()=>{
        getSiteTypeList().then(resp => setSTDList(resp));
    });

    console.log(STDlist);


    return(
        <div className="homepage">
            <h2>Home</h2>

            <div className="border site-list">
                {STDlist.map(st=> 
                <div className="border site-description">
                    <h3>{st.description}</h3>
                    <p><Link to={"/type/detail/"+st.id}>{st.siteType}</Link></p>
                </div>)}
            </div>
        </div>
    )
}