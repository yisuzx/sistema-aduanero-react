
function ServiceCard({ service }) 
{
    
    const { name, img, desc } = service;

    return(
        
        <div className="card h-100 shadow-sm text-center"> 
            

            <div className="img-container">
                <img 
                    src={img} 
                    alt={name}
                    className="card-img-top card-image" 
                />
            </div>
            
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{desc}</p>
            </div>
        </div>
    );
}
export default ServiceCard;