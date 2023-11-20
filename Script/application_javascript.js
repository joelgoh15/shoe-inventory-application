

window.addEventListener("load", start, false);
var asyncRequest;

function start() {

    //todo: register other event listener
    //for section update delete shoe inventory
    var cancelButtonUpdateDeleteSection = document.getElementById("idButtonCancelUpdateDelete");
    cancelButtonUpdateDeleteSection.addEventListener("click", fnCancelButtonUpdateDeleteSection, false);

    var saveButtonUpdateDeleteSection = document.getElementById("idButtonSaveUpdateDelete");
    saveButtonUpdateDeleteSection.addEventListener("click", fnSaveButtonUpdateDeleteSection, false);

    var deleteIntemButtonUpdateDeleteSection = document.getElementById("idButtonDeleteSelection");
    deleteIntemButtonUpdateDeleteSection.addEventListener("click", fnDeleteIntemButtonUpdateDeleteSection, false);

    //for section in get all inventory list 
    var addButtonAddItemToInventorySection = document.getElementById("idButtonAddNewShoeItem");
    addButtonAddItemToInventorySection.addEventListener("click", fnAddButtonAddItemToInventorySection, false);

    //for section add item to inventory
    var cancelButtonAddItemSection = document.getElementById("idButtonCancelAddItemInventorySection");
    cancelButtonAddItemSection.addEventListener("click", fnCancelButtonAddItemSection, false);

    //save button
    var submitButtonAddItemSection = document.getElementById("idButtonSubmitAddItemInventorySection");
    submitButtonAddItemSection.addEventListener("click", fnSubmitButtonAddItemSection, false);


    //todo: at first load display list all section, hide other sections
    document.getElementById("idDivListAllItemInventory").style.display = 'block';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';


    //load inventory table with data
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {

                var data = JSON.parse(asyncRequest.responseText);
                var varIdTableShoeInventory = document.getElementById("idTableShoeInventory");
                varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                    "<tr>" +
                    "<th>ID</th>" +
                    "<th>Shoe Name</th>" +
                    "<th>Shoe Description</th>" +
                    "<th>Shoe Price</th>" +
                    "<th>Shoe Size</th>" +
                    "<th>Quantity</th>" +
                    "</tr>";

                for (var counter = 0; counter < data.length; counter++) {
                    varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                        "<tr onclick='fnSelectedTableRow(this)'>" +
                        "<td>" + data[counter].id + "</td>" +
                        "<td>" + data[counter].shoeName + "</td>" +
                        "<td>" + data[counter].shoeDescription + "</td>" +
                        "<td>" + data[counter].shoePrice + "</td>" +
                        "<td>" + data[counter].shoeSize + "</td>" +
                        "<td>" + data[counter].quantity + "</td>" +
                        "</tr>";
                }
            }
        }, false);
        asyncRequest.open("GET", "https://localhost:44325/api/Application/getAllListShoeInventory", false);
        asyncRequest.send(null);

        //js code for snackbar get initial load
        var x = document.getElementById("snackbar_get_initial_load");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

    } catch (exception) {
        alert("Request failed.");
    }
}





function fnSelectedTableRow(e) {

    document.getElementById("idDivListAllItemInventory").style.display = 'none';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'block';

    var tds = e.getElementsByTagName('td');

    //populate form with data
    document.getElementById("idTextBoxUpdateDeleteShoeId").value = tds[0].innerHTML.trim();
    document.getElementById("idTextBoxUpdateDeleteShoeName").value = tds[1].innerHTML.trim();
    document.getElementById("idTextAreaUpdateDeleteShoeDescription").value = tds[2].innerHTML.trim();
    document.getElementById("idTextBoxUpdateDeleteShoePrice").value = tds[3].innerHTML.trim();
    document.getElementById("idInputShoeSizeUpdateDelete").value = tds[4].innerHTML.trim();
    document.getElementById("idInputQuantityUpdateDelete").value = tds[5].innerHTML.trim();

}


function fnCancelButtonUpdateDeleteSection() {

    document.getElementById("idTextBoxUpdateDeleteShoeId").value = "";
    document.getElementById("idTextBoxUpdateDeleteShoeName").value = "";
    document.getElementById("idTextAreaUpdateDeleteShoeDescription").value = "";
    document.getElementById("idTextBoxUpdateDeleteShoePrice").value = "";
    document.getElementById("idInputShoeSizeUpdateDelete").value = "";
    document.getElementById("idInputQuantityUpdateDelete").value = "";

    document.getElementById("idDivListAllItemInventory").style.display = 'block';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';


}


function fnSaveButtonUpdateDeleteSection() {


    var boolPutOperationSuccess;
    boolPutOperationSuccess = false;

    //API to update selectetd item
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () { }, false);
        asyncRequest.open("PUT", "https://localhost:44325/api/Application/updateShoeInventoryItemDetail", false);
        asyncRequest.setRequestHeader("Content-type", "application/json");
        var input = JSON.stringify({
            "id": document.getElementById("idTextBoxUpdateDeleteShoeId").value,
            "shoeName": document.getElementById("idTextBoxUpdateDeleteShoeName").value,
            "shoeDescription": document.getElementById("idTextAreaUpdateDeleteShoeDescription").value,
            "shoePrice": document.getElementById("idTextBoxUpdateDeleteShoePrice").value,
            "shoeSize": document.getElementById("idInputShoeSizeUpdateDelete").value,
            "quantity": document.getElementById("idInputQuantityUpdateDelete").value
        });
        asyncRequest.send(input);

        //alert("Inventory item update successfully.");
        boolPutOperationSuccess = true;

    } catch (exception) {
        alert("Fail to update inventory item.");
    }

    //clear all textboxes in update delete section
    document.getElementById("idTextBoxUpdateDeleteShoeId").value = "";
    document.getElementById("idTextBoxUpdateDeleteShoeName").value = "";
    document.getElementById("idTextAreaUpdateDeleteShoeDescription").value = "";
    document.getElementById("idTextBoxUpdateDeleteShoePrice").value = "";
    document.getElementById("idInputShoeSizeUpdateDelete").value = "";
    document.getElementById("idInputQuantityUpdateDelete").value = "";

    //back to main get section
    document.getElementById("idDivListAllItemInventory").style.display = 'block';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';

    //clear table for all item inventory (table)
    document.getElementById("idTableShoeInventory").innerHTML = "";

    //GET API for renew data at table
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {

                var data = JSON.parse(asyncRequest.responseText);
                var varIdTableShoeInventory = document.getElementById("idTableShoeInventory");
                varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                    "<tr>" +
                    "<th>ID</th>" +
                    "<th>Shoe Name</th>" +
                    "<th>Shoe Description</th>" +
                    "<th>Shoe Price</th>" +
                    "<th>Shoe Size</th>" +
                    "<th>Quantity</th>" +
                    "</tr>";

                for (var counter = 0; counter < data.length; counter++) {
                    varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                        "<tr onclick='fnSelectedTableRow(this)'>" +
                        "<td>" + data[counter].id + "</td>" +
                        "<td>" + data[counter].shoeName + "</td>" +
                        "<td>" + data[counter].shoeDescription + "</td>" +
                        "<td>" + data[counter].shoePrice + "</td>" +
                        "<td>" + data[counter].shoeSize + "</td>" +
                        "<td>" + data[counter].quantity + "</td>" +
                        "</tr>";
                }
            }
        }, false);
        asyncRequest.open("GET", "https://localhost:44325/api/Application/getAllListShoeInventory", false);
        asyncRequest.send(null);
    } catch (exception) {
        alert("Request failed.");
    }











    if (boolPutOperationSuccess == true) {
        //snackbar for PUT operation
        var x = document.getElementById("snackbar_put");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
}


function fnDeleteIntemButtonUpdateDeleteSection() {

    var boolPutOperationSuccess;
    boolPutOperationSuccess = false;

    //delete operation
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () { }, false);
        asyncRequest.open("DELETE", "https://localhost:44325/api/Application/deleteShoeInventoryItemId?shoeId=" + document.getElementById("idTextBoxUpdateDeleteShoeId").value, false);
        asyncRequest.send(null);

        //alert("Successfully deleted shoe by id.");
        boolPutOperationSuccess = true;

    } catch (exception) {
        alert("Failed to delete item.");
    }

    //clear entry
    document.getElementById("idTextBoxUpdateDeleteShoeId").value = "";
    document.getElementById("idTextBoxUpdateDeleteShoeName").value = "";
    document.getElementById("idTextAreaUpdateDeleteShoeDescription").value = "";
    document.getElementById("idTextBoxUpdateDeleteShoePrice").value = "";
    document.getElementById("idInputShoeSizeUpdateDelete").value = "";
    document.getElementById("idInputQuantityUpdateDelete").value = "";

    //back to main section
    document.getElementById("idDivListAllItemInventory").style.display = 'block';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';

    //clear table for all item inventory (table)
    document.getElementById("idTableShoeInventory").innerHTML = "";

    //GET API for renew data at table
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {

                var data = JSON.parse(asyncRequest.responseText);
                var varIdTableShoeInventory = document.getElementById("idTableShoeInventory");
                varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                    "<tr>" +
                    "<th>ID</th>" +
                    "<th>Shoe Name</th>" +
                    "<th>Shoe Description</th>" +
                    "<th>Shoe Price</th>" +
                    "<th>Shoe Size</th>" +
                    "<th>Quantity</th>" +
                    "</tr>";

                for (var counter = 0; counter < data.length; counter++) {
                    varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                        "<tr onclick='fnSelectedTableRow(this)'>" +
                        "<td>" + data[counter].id + "</td>" +
                        "<td>" + data[counter].shoeName + "</td>" +
                        "<td>" + data[counter].shoeDescription + "</td>" +
                        "<td>" + data[counter].shoePrice + "</td>" +
                        "<td>" + data[counter].shoeSize + "</td>" +
                        "<td>" + data[counter].quantity + "</td>" +
                        "</tr>";
                }
            }
        }, false);
        asyncRequest.open("GET", "https://localhost:44325/api/Application/getAllListShoeInventory", false);
        asyncRequest.send(null);
    } catch (exception) {
        alert("Request failed.");
    }

    if (boolPutOperationSuccess == true) {
        //snackbar for delete operation
        var x = document.getElementById("snackbar_delete");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
}

function fnAddButtonAddItemToInventorySection() {

    document.getElementById("idDivListAllItemInventory").style.display = 'none';
    document.getElementById("idDivAddItemToInventory").style.display = 'block';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';

}


function fnCancelButtonAddItemSection() {

    //clear entry
    document.getElementById("idTextBoxShoeName").value = "";
    document.getElementById("idTextAreaShoeDescription").value = "";
    document.getElementById("idTextBoxShoePrice").value = "";
    document.getElementById("idInputShoeSize").value = "";
    document.getElementById("idInputQuantity").value = "";

    //back to main section
    document.getElementById("idDivListAllItemInventory").style.display = 'block';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';

}

function fnSubmitButtonAddItemSection() {

    var boolPutOperationSuccess;
    boolPutOperationSuccess = false;

    //post item
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () { }, false);
        asyncRequest.open("POST", "https://localhost:44325/api/Application/addNewShoeInventoryItem2", false);
        asyncRequest.setRequestHeader("Content-type", "application/json");




        var input = JSON.stringify({
            "shoeName": document.getElementById("idTextBoxShoeName").value,
            "shoeDescription": document.getElementById("idTextAreaShoeDescription").value,
            "shoePrice": document.getElementById("idTextBoxShoePrice").value,
            "shoeSize": document.getElementById("idInputShoeSize").value,
            "quantity": document.getElementById("idInputQuantity").value
        });
        asyncRequest.send(input);


        boolPutOperationSuccess = true;


    } catch (exception) {
        alert("POST item not successful");
    }

    //clear entry
    document.getElementById("idTextBoxShoeName").value = "";
    document.getElementById("idTextAreaShoeDescription").value = "";
    document.getElementById("idTextBoxShoePrice").value = "";
    document.getElementById("idInputShoeSize").value =
        document.getElementById("idInputQuantity").value = "";

    //back to main section
    document.getElementById("idDivListAllItemInventory").style.display = 'block';
    document.getElementById("idDivAddItemToInventory").style.display = 'none';
    document.getElementById("idDivUpdateDeleteItemToInventory").style.display = 'none';

    //GET
    //clear table for all item inventory (table)
    document.getElementById("idTableShoeInventory").innerHTML = "";



    //GET API for renew data at table
    try {
        asyncRequest = new XMLHttpRequest();
        asyncRequest.addEventListener("readystatechange", function () {
            if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {

                var data = JSON.parse(asyncRequest.responseText);
                var varIdTableShoeInventory = document.getElementById("idTableShoeInventory");
                varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                    "<tr>" +
                    "<th>ID</th>" +
                    "<th>Shoe Name</th>" +
                    "<th>Shoe Description</th>" +
                    "<th>Shoe Price</th>" +
                    "<th>Shoe Size</th>" +
                    "<th>Quantity</th>" +
                    "</tr>";

                for (var counter = 0; counter < data.length; counter++) {
                    varIdTableShoeInventory.innerHTML = varIdTableShoeInventory.innerHTML +
                        "<tr onclick='fnSelectedTableRow(this)'>" +
                        "<td>" + data[counter].id + "</td>" +
                        "<td>" + data[counter].shoeName + "</td>" +
                        "<td>" + data[counter].shoeDescription + "</td>" +
                        "<td>" + data[counter].shoePrice + "</td>" +
                        "<td>" + data[counter].shoeSize + "</td>" +
                        "<td>" + data[counter].quantity + "</td>" +
                        "</tr>";
                }
            }
        }, false);
        asyncRequest.open("GET", "https://localhost:44325/api/Application/getAllListShoeInventory", false);
        asyncRequest.send(null);
        //alert("successfull load data.");
    } catch (exception) {
        alert("not successful load data");
    }

    if (boolPutOperationSuccess == true) {
        //jscode for snackpar post
        var x = document.getElementById("snackbar_post");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
}


