import React from 'react'

export default function Home() {
  return (
    <div className='text' style={{ 
      backgroundImage: `url("https://www.campbellrivermirror.com/wp-content/uploads/2021/03/24351851_web1_190604-sfe-bikelanes_1.jpg")` ,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh'
    
    }}>
        
        <div className="row">
            <div className="col-sm-3">
              <div className="card bg-light" style={{width: "300px"}}>
              <div className="card-header bg-success">
          What you can do in this app
              </div>

                  <ul class="list-group list-group-flush bg-light">
                    <li class="list-group-item">Display statistics on bike journeys</li>
                    <li class="list-group-item">Display info on all bike stations</li>
                    <li class="list-group-item">Add your bike journey</li>
                    <li class="list-group-item">Find bike stations nearby you</li>
                  </ul>
              </div>    
    
        </div>  
    </div>    
    </div>     

  )
}

