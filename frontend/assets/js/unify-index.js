$(document).ready(function () {

    $("#findPerson").submit(function (event) {

        event.preventDefault()
        var formData = new FormData(this);


        if($('#fingerPrint').get(0).files.length !=0){
            axios
            .post("http://35.78.91.151:8080/matchFingerPrint", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res)=>{
                console.log(res)

                if(res.data){

                    console.log(res.data[1].result[1][0])
                    axios
                    .get(`http://localhost:3000/getUsingFinger/${res.data[1].result[1][0]}`)
                    .then((res2)=>{
                        console.log(res2.data)
                        if(res2.data.status==200){
                            console.log("here")
                            $('#modalCenter').modal('show')
                            $('#findPerson')[0].reset();
            
                            arrayData = []
                            res2.data.result.forEach((item,index)=>{
            
                                modifiedItem = {
                                    State:item.State?item.State:' ',
                                    District_Name:item.District_Name?item.District_Name:' ',
                                    PS_Name:item.PS_Name?item.PS_Name:' ',
                                    FIRNo:item.FIRNo?item.FIRNo:' ',
                                    FIR_Date:item.FIR_Date?item.FIR_Date:' ',
                                    Person_No:item.Person_No?item.Person_No:' ',
                                    Arrest_Date:item.Arrest_Date?item.Arrest_Date:' ',
                                    Person_Name:item.Person_Name?item.Person_Name:' ',
                                    Father_Name:item.Father_Name?item.Father_Name:' ',
                                    Gender:item.Gender?item.Gender:' ',
                                    AgeWhileOpening:item.AgeWhileOpening?item.AgeWhileOpening:' ',
                                    Age:item.Age?item.Age:' ',
                                    Pres_Address1:item.Pres_Address1?item.Pres_Address1:' ',
                                    Perm_Address1:item.Perm_Address1?item.Perm_Address1:' ',
                                    PersonStatus:item.PersonStatus?item.PersonStatus:' ',
                                    Name:item.Name?item.Name:' ',
                                    Major_Head:item.Major_Head?item.Major_Head:' ',
                                    Minor_Head:item.Minor_Head?item.Minor_Head:' ',
                                    Crime_No:item.Crime_No?item.Crime_No:' ',
                                    Arr_ID:item.Arr_ID?item.Arr_ID:' ',
                                    Unit_ID:item.Unit_ID?item.Unit_ID:' ',
                                    FIR_ID:item.FIR_ID?item.FIR_ID:' ',
                                    DEDT:item.DEDT?item.DEDT:' '
                                }
            
            
                                modifiedItem['button']= `<form action="report.html" method="get"><input name="id" type="text" value=${item._id} style="display: none;"/><input type="submit" name="button" value="Report" class="btn btn-primary"/></form>`
                                // delete item['Photo_Full_front']
                                // delete item['_id']
                                // delete item['Fingerprint']
                                console.log(modifiedItem)
                                arrayData.push(Object.values(modifiedItem))
                            })
            
                            $('#personTable').DataTable({
                                data: arrayData,
                                destroy:true,
                                dom:'lBfrtip',
                                aLengthMenu:[[25, 50, -1],[25, 50, "All"]],
                            });
            
                            // console.log(arrayData)
            
                            heading = 'Success'
                            text = "Match found"
                            icon = "success"
                        }
                
                        if(res2.data.status==404){
                            heading = 'Information'
                            text = "No data found"
                            icon = "info"
                        }
            
                        if(res2.data.status==500){
                            heading = 'Error'
                            text = "Error occured while searching"
                            icon = "error"
                        }
                        $.toast({
                            heading: heading,
                            text: text,
                            showHideTransition: 'plain',
                            icon: icon,
                            position:'bottom-right',
                            hide:5000
                        })                       
                    })
                }
            })
        }

        else
            axios
        .post("http://localhost:3000/findPerson/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
            console.log(res.data)
            if(res.data.status==200){
                $('#modalCenter').modal('show')
                $('#findPerson')[0].reset();

                arrayData = []
                res.data.result.forEach((item,index)=>{

                    modifiedItem = {
                        State:item.State?item.State:' ',
                        District_Name:item.District_Name?item.District_Name:' ',
                        PS_Name:item.PS_Name?item.PS_Name:' ',
                        FIRNo:item.FIRNo?item.FIRNo:' ',
                        FIR_Date:item.FIR_Date?item.FIR_Date:' ',
                        Person_No:item.Person_No?item.Person_No:' ',
                        Arrest_Date:item.Arrest_Date?item.Arrest_Date:' ',
                        Person_Name:item.Person_Name?item.Person_Name:' ',
                        Father_Name:item.Father_Name?item.Father_Name:' ',
                        Gender:item.Gender?item.Gender:' ',
                        AgeWhileOpening:item.AgeWhileOpening?item.AgeWhileOpening:' ',
                        Age:item.Age?item.Age:' ',
                        Pres_Address1:item.Pres_Address1?item.Pres_Address1:' ',
                        Perm_Address1:item.Perm_Address1?item.Perm_Address1:' ',
                        PersonStatus:item.PersonStatus?item.PersonStatus:' ',
                        Name:item.Name?item.Name:' ',
                        Major_Head:item.Major_Head?item.Major_Head:' ',
                        Minor_Head:item.Minor_Head?item.Minor_Head:' ',
                        Crime_No:item.Crime_No?item.Crime_No:' ',
                        Arr_ID:item.Arr_ID?item.Arr_ID:' ',
                        Unit_ID:item.Unit_ID?item.Unit_ID:' ',
                        FIR_ID:item.FIR_ID?item.FIR_ID:' ',
                        DEDT:item.DEDT?item.DEDT:' '
                    }


                    modifiedItem['button']= `<form action="report.html" method="get"><input name="id" type="text" value=${item._id} style="display: none;"/><input type="submit" name="button" value="Report" class="btn btn-primary"/></form>`
                    // delete item['Photo_Full_front']
                    // delete item['_id']
                    // delete item['Fingerprint']
                    console.log(modifiedItem)
                    arrayData.push(Object.values(modifiedItem))
                })

                $('#personTable').DataTable({
                    data: arrayData,
                    destroy:true,
                    dom:'lBfrtip',
                    aLengthMenu:[[25, 50, -1],[25, 50, "All"]],
                });

                // console.log(arrayData)

                heading = 'Success'
                text = "Match found"
                icon = "success"
            }
    
            if(res.data.status==404){
                heading = 'Information'
                text = "No data found"
                icon = "info"
            }

            if(res.data.status==500){
                heading = 'Error'
                text = "Error occured while searching"
                icon = "error"
            }
            $.toast({
                heading: heading,
                text: text,
                showHideTransition: 'plain',
                icon: icon,
                position:'bottom-right',
                hide:5000
            })
        })
        .catch((err) => {
            console.log(err)

            $.toast({
                heading:'Error',
                text:"Error occured while searching",
                icon:"error",
                showHideTransition: 'plain',
                icon: icon,
                position:'bottom-right',
                hide:5000
            })
        });
    })
})