import ServiceCard from "./ServiceCard";
import { services } from "../data/servicios";

function Service()
{
    return(
        <section id="Services" className="section">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    {services.map(
                      (serv) => (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={serv.id}>
                            <ServiceCard service={serv}/>
                        </div>    
                      )  
                    )
                    }
                </div>
            </div>
        </section>
    );
}
export default Service;