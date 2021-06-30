DrMap React Application:

Description:

    Location visualisation of available Dr.Button doctors on a map,providing further information for each.
  
Info:

    -Using npm@17.0.2 for the application
  
    -Main files on src/ directory
  
    -Implemented 'google-maps-react' library for Google Maps deployment 
      (For installation : sudo npm install  --legacy-peer-deps  --save  google-maps-react)
      (Without --legacy-peer-deps  had some issues with npm version)
    
    
  Git Control:
  
    Repository: https://github.com/pagoulid/map-info.git
     -Two branches: master,test
     
        Main Content on master branch
        Changes on test branch
        Comparing changes on test with current content on master through pull request
        On completion  of each implementation test content was merged with master content by master
        
 Features:
        
        Implementing Google maps on DrMap main page
        Visualising markers on map due to coordinates(latitude,longitude) of each doctor location (Each marker has the id of its doctor respectively)
        Center relocation of map according to coordinates of doctor's location with id = 1
        On marker click , displaying further information about doctor
        Added custom zoom in/out(Left click/Right click on map) 
        
                    NOTE : To display information click marker to select,then click again
                    NOTE : It is preferable to use the custom implementation of zoom , and not the zoom buttons provided by Google API , 
                            to avoid bugs with the display
        
    
  Files:
        
        Map.js,Map.css : Google Maps  Deployment
        App.js,App.css : Main page implementation
        Info.js,Info.css : Passing information about a doctor to display them on Map
        Tag.js,Tag.css : Animation circle implementation to info display on Map(NOTE : Styling is not fixed well)
        doctors.json : Stored doctor's data.Needed to retrieve the data and parse it on the application
        
        
        
