import React, { useState , useEffect } from 'react';
//import {CSVLink, CSVDownload} from 'react-csv';

const download = function(userData){
    //console.log("Downloading... @ ", userData.pk);
    const fileData = JSON.stringify(userData);
    //console.log(fileData);

    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "user-info.json";
    link.href = url;
    link.click();

}

export default download;