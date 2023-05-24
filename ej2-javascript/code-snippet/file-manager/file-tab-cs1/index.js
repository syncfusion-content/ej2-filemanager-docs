var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
// inject feature modules of the file manager
ej.filemanager.FileManager.Inject(ej.filemanager.DetailsView,ej.filemanager.Toolbar,ej.filemanager.NavigationPane);

//Initialize Tab component
var tabObj = new ej.navigations.Tab({
    heightAdjustMode: 'None',
    height: 320,
    showCloseButton: true,
    selecting: onSelect
});
//Render initialized Tab component
tabObj.appendTo('#tab_orientation');

// initialize File Manager component
var fileObject = new ej.filemanager.FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
});

// render initialized FileManager
fileObject.appendTo('#filemanager');

function onSelect()  {
   fileObject.refreshLayout();
}

