<?php
    /* Database connection start */
    require_once("db_provider.php");
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    //check connection
    if ($mysqli->connect_errno) 
    {
        echo "<p>MySQL fejl nummer {$mysqli->connect_errno} : {$mysqli->connect_error}</p>";
        exit();
    }
 
    $columns = array( 
    // datatable column index  => database column name
	0 => 'ID', 
	1 => 'Navn'
    );

    $sql = "SELECT ID, Navn from medlemmer";
    $query = $mysqli->query($sql);

    // getting total number records without any search
    $$totalData = mysqli_num_rows($query);
    $totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


    $sql = "SELECT ID, Navn FROM medlemmer WHERE 1=1";
    
    if(!empty($requestData['search']['value']) ) 
    {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
	$sql.=" AND ( Navn LIKE '".$requestData['search']['value']."%' ";    
	$sql.=" OR ID LIKE '".$requestData['search']['value']."%')";
    }
    
    $query = $mysqli->query($sql); 
    $totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
    $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."  LIMIT ".$requestData['start']." ,".$requestData['length']."   ";
    
    /* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */	
    $query = $mysqli->query($sql); 

    $data = array();
    while( $row=mysqli_fetch_array($query) ) 
    {  // preparing an array
	$nestedData=array(); 

	$nestedData[] = $row["ID"];
	$nestedData[] = $row["Navn"];
	
	$data[] = $nestedData;
    }



$json_data = array(
			"draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
			"recordsTotal"    => intval( $totalData ),  // total number of records
			"recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
			"data"            => $data   // total data array
			);

echo json_encode($json_data);  // send data as json format
