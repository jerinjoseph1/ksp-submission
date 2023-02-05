$(document).ready(function () {

    $("#findPerson").submit(function (event) {

        event.preventDefault()
        var formData = new FormData(this);

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

                    delete item['Photo_Full_front']

                    item['Fingerprint']? delete item['Fingerprint'] : null

                    item['button']= `<form action="report.html" method="get"><input name="id" type="text" value=${item._id} style="display: none;"/><input type="submit" name="button" value="Report" class="btn btn-primary"/></form>`
                    arrayData.push(Object.values(item))
                })

                $('#personTable').DataTable({
                    data: arrayData,
                    destroy:true,
                    dom:'lBfrtip',
                    aLengthMenu:[[25, 50, -1],[25, 50, "All"]],
                    columnDefs: [
                        {
                            target: 0,
                            visible: false,
                            searchable: false,
                        }
                    ]
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