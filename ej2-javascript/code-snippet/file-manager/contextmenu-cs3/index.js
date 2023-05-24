var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
// inject feature modules of the file manager
ej.filemanager.FileManager.Inject(ej.filemanager.DetailsView,ej.filemanager.Toolbar,ej.filemanager.NavigationPane);
// initialize File Manager component
var filemanagerInstance = new ej.filemanager.FileManager({
    ajaxSettings: {
        url: hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: hostUrl + 'api/FileManager/GetImage',
        uploadUrl: hostUrl + 'api/FileManager/Upload',
        downloadUrl: hostUrl + 'api/FileManager/Download'
    },
    // Custom menu item added to context menu
    contextMenuSettings: {
     file: ["Custom", "Open", "|", "Delete", "Download", "Rename", "|", "Details"],
     folder: ["Custom", "Open", "|", "Delete", "Download", "Rename", "|", "Details"],
     layout: ["Custom", "SortBy", "View", "Refresh", "|", "NewFolder", "Upload", "|", "Details", "|", "SelectAll"],
     visible: true
    },
    menuOpen: menuOpen,
    menuClick: menuClick
});

// Icon added to custom menu item
function menuOpen(args) {
    for(let i = 0; i<args.items.length; i++) {
        if(args.items[i].id === this.element.id +'_cm_custom') {
            args.items[i].iconCss = 'e-icons e-fe-tick';
        }
    }
}

// event for custom menu item
function menuClick(args) {
    if (args.item.text === 'Custom') {
        alert('You have clicked custom menu item')
    }
}

// render initialized File Manager
filemanagerInstance.appendTo('#filemanager');

