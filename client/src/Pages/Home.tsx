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
        <div>
            <h2>Home</h2>

            <div className="site-type-list-container">
                {STDlist.map(st=> 
                <div className="site-type-container">
                    <h3>{st.description}</h3>
                    <p><Link to={"/type/detail/"+st.id}>{st.siteType}</Link></p>
                </div>)}
            </div>
        </div>
    )
}